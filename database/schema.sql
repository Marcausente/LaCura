-- Create profiles table if it doesn't exist
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  nombre text,
  apellidos text,
  fecha_nacimiento date,
  avatar_url text,
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
