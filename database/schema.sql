-- Create profiles table if it doesn't exist
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  nombre text,
  apellido1 text,
  apellido2 text,
  fecha_nacimiento date,
  avatar_url text,
  verified boolean not null default false,
  constraint username_length check (char_length(nombre) >= 3)
);

-- Add 'rol' column if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'rol') then
        alter table profiles add column rol text default 'Gratuito' check (rol in ('Gratuito', 'Premium', 'Administrador', 'Superadministrador'));
    end if;
end $$;

-- Enable RLS
alter table profiles enable row level security;

-- Policies (Re-creating them to ensure they match)
drop policy if exists "Public profiles are viewable by everyone." on profiles;
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Storage (Create bucket if not exists)
insert into storage.buckets (id, name, public) 
  values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

-- Storage Policies
drop policy if exists "Avatar images are publicly accessible." on storage.objects;
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

drop policy if exists "Anyone can upload an avatar." on storage.objects;
create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

drop policy if exists "Anyone can update their own avatar." on storage.objects;
create policy "Anyone can update their own avatar."
  on storage.objects for update
  using ( auth.uid() = owner )
  with check ( bucket_id = 'avatars' );

-- Function to handle new user registration
drop function if exists public.handle_new_user() cascade;
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, updated_at, rol, verified)
  values (new.id, now(), 'Gratuito', false);
  return new;
exception
  when others then
    -- Log error but don't fail the user creation
    raise warning 'Error creating profile for user %: %', new.id, sqlerrm;
    return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user registration
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create email_verification table
create table if not exists email_verification (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) on delete cascade not null,
  token text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Enable RLS on email_verification
alter table email_verification enable row level security;

-- Policy to allow users to read their own verification records
drop policy if exists "Users can view own verification." on email_verification;
create policy "Users can view own verification."
  on email_verification for select
  using ( auth.uid() = profile_id );

-- Policy to allow system to insert verification records
drop policy if exists "System can insert verification." on email_verification;
create policy "System can insert verification."
  on email_verification for insert
  with check ( true );

-- Function to generate verification token
drop function if exists public.generate_verification_token(uuid) cascade;
create or replace function public.generate_verification_token(user_id uuid)
returns text as $$
declare
  new_token text;
  token_expiry timestamptz;
begin
  -- Generate a random token (32 characters)
  new_token := encode(gen_random_bytes(24), 'base64');
  new_token := replace(new_token, '/', '_');
  new_token := replace(new_token, '+', '-');
  
  -- Token expires in 24 hours
  token_expiry := now() + interval '24 hours';
  
  -- Delete any existing verification tokens for this user
  delete from email_verification where profile_id = user_id;
  
  -- Insert new verification token
  insert into email_verification (profile_id, token, expires_at)
  values (user_id, new_token, token_expiry);
  
  return new_token;
end;
$$ language plpgsql security definer;

-- Function to verify email with token
drop function if exists public.verify_email_token(text) cascade;
create or replace function public.verify_email_token(verification_token text)
returns json as $$
declare
  verification_record record;
  result json;
begin
  -- Find the verification record
  select * into verification_record
  from email_verification
  where token = verification_token
  and expires_at > now();
  
  if verification_record is null then
    return json_build_object('success', false, 'message', 'Token inválido o expirado');
  end if;
  
  -- Update profile to set verified = true
  update profiles
  set verified = true, updated_at = now()
  where id = verification_record.profile_id;
  
  -- Delete the used token
  delete from email_verification where id = verification_record.id;
  
  return json_build_object('success', true, 'message', 'Email verificado correctamente', 'profile_id', verification_record.profile_id);
end;
$$ language plpgsql security definer;

-- Function to resend verification email (generates new token)
drop function if exists public.resend_verification_token(uuid) cascade;
create or replace function public.resend_verification_token(user_id uuid)
returns json as $$
declare
  profile_record record;
  new_token text;
begin
  -- Check if user exists and is not already verified
  select * into profile_record
  from profiles
  where id = user_id;
  
  if profile_record is null then
    return json_build_object('success', false, 'message', 'Usuario no encontrado');
  end if;
  
  if profile_record.verified = true then
    return json_build_object('success', false, 'message', 'El email ya está verificado');
  end if;
  
  -- Generate new token
  new_token := generate_verification_token(user_id);
  
  return json_build_object('success', true, 'message', 'Token generado correctamente', 'token', new_token);
end;
$$ language plpgsql security definer;
