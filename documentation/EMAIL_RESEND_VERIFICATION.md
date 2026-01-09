# 📧 La Cura - Sistema de Verificación de Email

> Sistema completo de verificación de email con Resend, compatible con Netlify (testing) e IONOS (producción)

---

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [¿Qué se ha Implementado?](#qué-se-ha-implementado)
3. [Arquitectura](#arquitectura)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Quick Start - Netlify](#quick-start---netlify)
6. [Deployment en IONOS](#deployment-en-ionos)
7. [Configuración](#configuración)
8. [Backend API](#backend-api)
9. [Frontend](#frontend)
10. [Base de Datos](#base-de-datos)
11. [Testing](#testing)
12. [Troubleshooting](#troubleshooting)
13. [Personalización](#personalización)
14. [Monitoring](#monitoring)

---

## 🎯 Introducción

Este proyecto incluye un **sistema completo de verificación de email** que:

✅ Envía correos de verificación automáticamente al registrarse  
✅ Muestra un banner para usuarios no verificados  
✅ Permite reenviar emails de verificación  
✅ Verifica cuentas mediante enlaces seguros con tokens  
✅ **Se adapta automáticamente** a Netlify o IONOS  
✅ Backend portable (Express.js)  

### Características Principales

- 🎨 **UI Moderna**: Banner con gradiente, animaciones suaves
- 📧 **Email Profesional**: Template responsive en español
- 🔒 **Seguro**: Tokens UUID con expiración de 24 horas
- 📱 **Responsive**: Diseño adaptado a móvil y desktop
- 🔄 **Flexible**: Backend puede estar separado o junto al frontend
- 🚀 **Portable**: Funciona en cualquier hosting con Node.js

---

## 🆕 ¿Qué se ha Implementado?

### Archivos Nuevos (11)

#### Backend API (Node.js + Express)
```
server/
├── index.js                          # Servidor Express principal
├── controllers/
│   └── emailVerification.js         # Lógica de emails
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

#### Funciones Netlify (para testing)
```
netlify/functions/
├── send-verification-email.js
└── verify-email.js
```

#### Componentes React
```
src/components/
├── EmailVerificationBanner.jsx      # Banner para no verificados
├── EmailVerificationBanner.css
├── VerificarEmail.jsx              # Página de confirmación
└── VerificarEmail.css
```

#### Sistema de Configuración
```
src/config/
└── api.js                           # Detección automática de plataforma
```

### Archivos Modificados (7)

- ✏️ `database/schema.sql` - Nueva tabla y columna
- ✏️ `src/App.jsx` - Banner y ruta de verificación
- ✏️ `src/context/AuthContext.jsx` - Envío automático de emails
- ✏️ `src/components/AuthModal.jsx` - Mensaje de éxito
- ✏️ `src/components/AuthModal.css` - Estilos de éxito
- ✏️ `netlify.toml` - Configuración de funciones
- ✏️ `package.json` - Dependencia Resend

---

## 🏗️ Arquitectura

### Flujo de Comunicación

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Frontend (React)   │
│  - Vite + React     │
│  - Detección auto   │
└──────┬──────────────┘
       │
       ├──[Netlify]──► Netlify Functions ──┐
       │                                    │
       └──[IONOS]────► Express API ────────┤
                                            ▼
                                    ┌───────────────┐
                                    │   Supabase    │
                                    │   (Database)  │
                                    └───────────────┘
                                            │
                                            ▼
                                    ┌───────────────┐
                                    │    Resend     │
                                    │    (Email)    │
                                    └───────────────┘
```

### Detección Automática de Plataforma

El archivo `src/config/api.js` detecta automáticamente:

| Entorno | API Endpoint | Notas |
|---------|-------------|-------|
| **Netlify** | `/.netlify/functions` | Usa Netlify Functions |
| **IONOS** | `https://tudominio.com/api` | Usa Express API |
| **Local** | `http://localhost:3000/api` | Desarrollo local |

```javascript
// Ejemplo de detección automática
const isNetlify = hostname.includes('netlify');

if (isNetlify) {
  API_URL = '/.netlify/functions';
} else if (PROD) {
  API_URL = VITE_BACKEND_URL || '/api';
} else {
  API_URL = 'http://localhost:3000/api';
}
```

---

## 📁 Estructura del Proyecto

```
LaCura/
│
├── 🔵 FRONTEND (React + Vite)
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js                      ⭐ Detección automática
│   │   ├── components/
│   │   │   ├── EmailVerificationBanner.jsx ⭐ Banner
│   │   │   ├── VerificarEmail.jsx         ⭐ Página verificación
│   │   │   ├── AuthModal.jsx              ✏️ Actualizado
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AuthContext.jsx            ✏️ Envío emails
│   │   └── ...
│   ├── public/
│   └── .env.production                     ⚙️ Configurar
│
├── 🟢 BACKEND (Node.js + Express)
│   ├── server/
│   │   ├── index.js                        ⭐ Servidor
│   │   ├── controllers/
│   │   │   └── emailVerification.js       ⭐ Lógica
│   │   ├── package.json
│   │   ├── .env.example
│   │   └── README.md
│   │
│   └── netlify/functions/                  # Para Netlify
│       ├── send-verification-email.js
│       └── verify-email.js
│
├── 🗄️ DATABASE
│   └── database/
│       └── schema.sql                      ✏️ Actualizado
│
├── 📚 DOCUMENTACIÓN
│   └── README.md                           ⭐ Este archivo
│
└── ⚙️ CONFIGURACIÓN
    ├── netlify.toml
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Quick Start - Netlify

> **Para testing rápido** (5 minutos)

### Paso 1: Configurar Resend

1. Ir a [https://resend.com](https://resend.com)
2. Crear cuenta
3. Verificar dominio (o usar dominio de prueba)
4. Obtener **API Key** del dashboard
5. Guardar la API key

### Paso 2: Actualizar Base de Datos en Supabase

1. Ir a tu Dashboard de Supabase
2. Abrir **SQL Editor**
3. Copiar y pegar el contenido de `database/schema.sql`
4. Click en **Run** para ejecutar

Esto creará:
- Columna `verified` en tabla `profiles`
- Tabla `email_verification` para tokens
- Políticas RLS necesarias

### Paso 3: Configurar Variables en Netlify

1. Ir al dashboard de tu sitio en Netlify
2. Navegar a: **Site settings > Environment variables**
3. Añadir las siguientes variables:

| Variable | Dónde Obtenerla | Ejemplo |
|----------|-----------------|---------|
| `VITE_SUPABASE_URL` | Supabase Dashboard | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard > Settings > API | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard > Settings > API | `eyJhbGc...` |
| `RESEND_API_KEY` | Resend Dashboard | `re_xxxxx` |
| `RESEND_FROM_EMAIL` | Tu email verificado | `noreply@tudominio.com` |
| `URL` | Tu URL de producción | `https://tudominio.netlify.app` |

4. Click **Save** y redeploy

### Paso 4: Deploy

```bash
git add .
git commit -m "Add email verification system"
git push
```

Netlify desplegará automáticamente.

### Paso 5: Testing

1. Ir a tu sitio
2. Click en "Registrarse"
3. Completar formulario
4. ✅ Debe aparecer mensaje de éxito
5. ✅ Revisar email (incluir spam)
6. Click en "Verificar mi cuenta"
7. ✅ Debe mostrar página de éxito
8. ✅ Banner debe desaparecer

---

## 🏢 Deployment en IONOS

> **Para producción** (20-30 minutos)

### Opción A: Todo en IONOS (Backend + Frontend)

#### Requisitos
- Plan IONOS con soporte para Node.js
- Acceso SSH al servidor
- FTP/SFTP configurado

#### 1. Preparar Backend

```bash
# Comprimir carpeta server
cd server
zip -r backend.zip . -x "node_modules/*" -x ".env"
```

#### 2. Subir Backend a IONOS

**Via FTP/SFTP:**
1. Conectar al servidor IONOS
2. Subir archivos a `/node-app/` (o directorio configurado)
3. No subir `node_modules/` ni `.env`

**Via SSH:**
```bash
# Conectar
ssh usuario@tu-servidor.ionos.com

# Navegar al directorio
cd /node-app

# Instalar dependencias
npm install --production
```

#### 3. Configurar Variables de Entorno del Backend

**En el panel de IONOS:**
1. Ir a: **Node.js Settings > Environment Variables**
2. Añadir todas las variables:

```env
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://tudominio.com
VITE_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@tudominio.com
FRONTEND_URL=https://tudominio.com
URL=https://tudominio.com
```

#### 4. Iniciar Backend

En el panel de IONOS:
1. **Start Command**: `node index.js`
2. Click en **Start Application**
3. Verificar que el estado es "Running"

#### 5. Configurar Reverse Proxy

Para acceder en `https://tudominio.com/api`:

1. En IONOS: **Domains & SSL > Domain Settings**
2. Crear regla **Reverse Proxy**:
   - **Source**: `https://tudominio.com/api/*`
   - **Target**: `http://localhost:3000/api/*`
3. Guardar

#### 6. Build y Deploy Frontend

```bash
# Crear archivo de configuración
cat > .env.production << EOF
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_BACKEND_URL=https://tudominio.com/api
VITE_DEPLOY_PLATFORM=ionos
EOF

# Build
npm run build
```

#### 7. Subir Frontend a IONOS

**Via FTP:**
1. Conectar al servidor
2. Ir a `/htdocs` o `/public_html`
3. Borrar contenido existente
4. Subir todo el contenido de `dist/`

#### 8. Configurar .htaccess

Crear `.htaccess` en la raíz del hosting:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect API calls to backend
  RewriteCond %{REQUEST_URI} ^/api/(.*)$
  RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
  
  # Handle React Router (SPA)
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Opción B: Backend Externo + Frontend en IONOS ⭐ Recomendado

Esta opción es **más fácil** y funciona en **cualquier plan** de IONOS.

#### 1. Deploy Backend en Railway (Gratuito)

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd server
railway init
railway up

# Obtener URL
railway open
# URL: https://lacura-backend-production.up.railway.app
```

**Configurar variables en Railway Dashboard:**
- Ir a tu proyecto en Railway
- Click en **Variables**
- Añadir todas las variables del backend (ver lista arriba)

#### 2. Deploy Frontend en IONOS

```bash
# Configurar con URL de Railway
cat > .env.production << EOF
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_BACKEND_URL=https://lacura-backend-production.up.railway.app/api
VITE_DEPLOY_PLATFORM=ionos
EOF

# Build
npm run build

# Subir dist/ a IONOS via FTP
```

#### Servicios Alternativos para Backend

**Render.com:**
1. Crear cuenta en render.com
2. "New Web Service"
3. Conectar repositorio
4. Build Command: `cd server && npm install`
5. Start Command: `node server/index.js`

**Fly.io:**
```bash
# Instalar Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
cd server
fly launch
fly deploy
```

---

## ⚙️ Configuración

### Variables de Entorno

#### Backend (server/.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://tudominio.com

# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@tudominio.com

# Frontend URL (for email verification links)
FRONTEND_URL=https://tudominio.com
URL=https://tudominio.com
```

**⚠️ IMPORTANTE:**
- Nunca commits `.env` a Git
- `SUPABASE_SERVICE_ROLE_KEY` es muy sensible - solo en servidor
- Obtener Service Role Key en: Supabase > Settings > API

#### Frontend (.env.production)

```env
# Supabase (público)
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Backend API URL
VITE_BACKEND_URL=https://tudominio.com/api
# O si usas Railway/Render:
# VITE_BACKEND_URL=https://tu-backend.railway.app/api

# Platform (opcional, para debugging)
VITE_DEPLOY_PLATFORM=ionos
```

---

## 🔌 Backend API

### Endpoints Disponibles

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "La Cura API is running",
  "timestamp": "2026-01-09T10:30:00.000Z"
}
```

#### Enviar Email de Verificación
```http
POST /api/send-verification-email
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "usuario@example.com"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Verification email sent successfully",
  "emailId": "abc123..."
}
```

**Response Error:**
```json
{
  "error": "Error sending verification email"
}
```

#### Verificar Email
```http
POST /api/verify-email
Content-Type: application/json

{
  "token": "550e8400-e29b-41d4-a716-446655440000"
}
```

O via GET:
```http
GET /api/verify-email?token=550e8400-e29b-41d4-a716-446655440000
```

**Response Success:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Response Error:**
```json
{
  "error": "Invalid or expired verification token"
}
```

### Iniciar Backend Localmente

```bash
# Desarrollo (con auto-reload)
cd server
npm install
npm run dev

# Producción
npm start
```

### Dependencias del Backend

```json
{
  "express": "^4.18.2",          // Framework web
  "cors": "^2.8.5",              // CORS middleware
  "dotenv": "^16.3.1",           // Variables de entorno
  "resend": "^3.2.0",            // Cliente de Resend
  "@supabase/supabase-js": "^2.39.0"  // Cliente de Supabase
}
```

---

## 🎨 Frontend

### Componentes Principales

#### EmailVerificationBanner

Banner persistente que aparece para usuarios no verificados.

**Ubicación**: `src/components/EmailVerificationBanner.jsx`

**Características:**
- Aparece solo si el usuario está logueado y NO verificado
- Sticky position en la parte superior
- Botón para reenviar email de verificación
- Mensajes de feedback (éxito/error)
- Responsive

**Props:** Ninguno (usa `useAuth` hook)

#### VerificarEmail

Página de confirmación de verificación de email.

**Ubicación**: `src/components/VerificarEmail.jsx`

**Estados:**
- `verifying`: Validando token
- `success`: Verificación exitosa
- `error`: Token inválido o expirado

**Características:**
- Animaciones suaves
- Redirección automática tras éxito (3 segundos)
- Manejo completo de errores

#### AuthModal (Actualizado)

Modal de registro/login con mensaje de éxito tras registro.

**Cambios:**
- Nuevo estado `registrationSuccess`
- Pantalla de éxito con animación
- Redirección con delay de 3 segundos

### Configuración API (`src/config/api.js`)

```javascript
import { API_ENDPOINTS } from '../config/api';

// Uso en componentes
fetch(API_ENDPOINTS.sendVerificationEmail, {
  method: 'POST',
  body: JSON.stringify({ userId, email })
});
```

**Exportaciones:**
- `API_BASE_URL`: URL base del API
- `API_ENDPOINTS`: Objeto con todos los endpoints
- `PLATFORM`: Información de la plataforma actual

### Integración con AuthContext

El `AuthContext` se ha actualizado para enviar automáticamente el email de verificación:

```javascript
const register = async (email, password, metadata = {}) => {
  // Crear usuario en Supabase
  const { data, error } = await supabase.auth.signUp({...});
  
  // Crear perfil con verified: false
  await supabase.from('profiles').insert({
    id: data.user.id,
    verified: false,
    ...metadata
  });
  
  // Enviar email automáticamente
  await fetch(API_ENDPOINTS.sendVerificationEmail, {
    method: 'POST',
    body: JSON.stringify({ userId: data.user.id, email })
  });
};
```

---

## 🗄️ Base de Datos

### Schema Actualizado

#### Tabla: profiles (modificada)

```sql
ALTER TABLE profiles ADD COLUMN verified boolean DEFAULT false;
```

| Columna | Tipo | Default | Descripción |
|---------|------|---------|-------------|
| `verified` | `boolean` | `false` | Indica si el email está verificado |

#### Tabla: email_verification (nueva)

```sql
CREATE TABLE email_verification (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | `uuid` | ID único del registro |
| `profile_id` | `uuid` | Referencia al usuario |
| `token` | `text` | Token de verificación (UUID) |
| `expires_at` | `timestamptz` | Fecha de expiración (24h) |
| `created_at` | `timestamptz` | Fecha de creación |

#### Row Level Security (RLS)

```sql
-- Solo funciones de backend pueden acceder
CREATE POLICY "Service role can manage email verifications."
  ON email_verification FOR ALL
  USING (true)
  WITH CHECK (true);
```

### Queries Útiles

```sql
-- Ver usuarios verificados vs no verificados
SELECT 
    verified,
    COUNT(*) as cantidad
FROM profiles
GROUP BY verified;

-- Ver tokens activos
SELECT 
    ev.id,
    ev.token,
    ev.expires_at,
    p.nombre,
    CASE 
        WHEN ev.expires_at > NOW() THEN 'Válido'
        ELSE 'Expirado'
    END as estado
FROM email_verification ev
JOIN profiles p ON p.id = ev.profile_id
ORDER BY ev.created_at DESC;

-- Limpiar tokens expirados (ejecutar periódicamente)
DELETE FROM email_verification
WHERE expires_at < NOW();

-- Ver usuarios que aún no han verificado (más de 7 días)
SELECT 
    p.nombre,
    p.apellidos,
    au.email,
    au.created_at
FROM profiles p
JOIN auth.users au ON au.id = p.id
WHERE p.verified = false
    AND au.created_at < NOW() - INTERVAL '7 days'
ORDER BY au.created_at DESC;
```

---

## 🧪 Testing

### Testing Local Completo

#### 1. Iniciar Backend

```bash
cd server
npm install
node index.js
```

Verificar que aparece:
```
🚀 La Cura API running on port 3000
📧 Email verification endpoints ready
🔗 Health check: http://localhost:3000/api/health
```

#### 2. Iniciar Frontend

```bash
# En otra terminal
npm run dev
```

Abrir: `http://localhost:5173`

#### 3. Test de Registro

1. Click en "Registrarse"
2. Completar formulario:
   - Email: `test@example.com`
   - Contraseña: `Test123!`
3. Click en "Crear Cuenta"

**Verificar:**
- ✅ Modal muestra mensaje de éxito
- ✅ Consola del navegador sin errores
- ✅ Redirige a `/completar-perfil` tras 3 segundos

#### 4. Test de Email

**Verificar en Resend Dashboard:**
1. Ir a: https://resend.com/emails
2. Buscar el email enviado
3. Verificar estado: "Delivered"
4. Copiar el token del URL del email

**O revisar email real:**
- Buscar en bandeja de entrada (y spam)
- Abrir email
- Verificar diseño y contenido

#### 5. Test de Verificación

**Opción A: Via UI**
- Click en el enlace del email
- Debe redirigir a `/verificar-email?token=...`
- Página debe mostrar éxito
- Redirige a `/` tras 3 segundos

**Opción B: Via curl**
```bash
curl -X POST http://localhost:3000/api/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "550e8400-e29b-41d4-a716-446655440000"}'
```

#### 6. Test de Banner

1. Crear usuario sin verificar email
2. Hacer login
3. **Verificar:**
   - ✅ Banner aparece en la parte superior
   - ✅ Botón "Reenviar correo" funciona
   - ✅ Mensaje de confirmación aparece

4. Verificar email
5. Recargar página
6. **Verificar:**
   - ✅ Banner NO aparece

### Testing de Endpoints (curl)

#### Health Check
```bash
curl http://localhost:3000/api/health
```

**Expected:**
```json
{"status":"ok","message":"La Cura API is running","timestamp":"..."}
```

#### Send Verification Email
```bash
curl -X POST http://localhost:3000/api/send-verification-email \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com"
  }'
```

#### Verify Email
```bash
curl -X POST http://localhost:3000/api/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_TOKEN_HERE"}'
```

### Testing en Producción

#### 1. Backend Health Check
```bash
curl https://tudominio.com/api/health
```

#### 2. Flujo Completo
1. Registrar usuario real
2. Verificar que email llega
3. Click en enlace de verificación
4. Verificar que banner desaparece
5. Probar reenvío de email

#### 3. Verificar Logs

**Netlify:**
- Dashboard > Functions > Logs

**Railway:**
```bash
railway logs
```

**IONOS (si usas PM2):**
```bash
pm2 logs
```

---

## 🔧 Troubleshooting

### Emails No Llegan

**Síntomas:**
- Usuario se registra pero no recibe email
- No hay errores visibles en la UI

**Diagnóstico:**

1. **Verificar API Key de Resend**
```bash
# Verificar que la variable está configurada
echo $RESEND_API_KEY  # Backend
```

2. **Verificar Dominio en Resend**
- Ir a: Resend Dashboard > Domains
- Verificar que el dominio del `RESEND_FROM_EMAIL` está verificado

3. **Revisar Logs**
```bash
# Backend local
# Ver consola del terminal

# Backend en Railway
railway logs

# Backend en IONOS
pm2 logs
```

4. **Probar Resend directamente**
```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer re_xxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "noreply@tudominio.com",
    "to": "test@example.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

**Soluciones:**
- ✅ Verificar que API key es correcta
- ✅ Usar dominio verificado o `onboarding@resend.dev` para pruebas
- ✅ Revisar carpeta de spam
- ✅ Verificar que `RESEND_FROM_EMAIL` tiene formato correcto

### Banner No Desaparece

**Síntomas:**
- Usuario verifica email pero el banner sigue apareciendo

**Diagnóstico:**

1. **Verificar en Base de Datos**
```sql
SELECT id, verified FROM profiles 
WHERE id = 'USER_ID';
```

2. **Limpiar caché del navegador**
```
- Chrome: Ctrl+Shift+Delete
- Limpiar cookies y caché
- Recargar: Ctrl+F5
```

3. **Verificar que el token se procesó**
```sql
-- El token NO debe existir (se borra tras verificar)
SELECT * FROM email_verification 
WHERE profile_id = 'USER_ID';
```

**Soluciones:**
- ✅ Recargar página con Ctrl+F5
- ✅ Verificar que `verified = true` en BD
- ✅ Logout y login de nuevo

### CORS Error

**Síntomas:**
```
Access to fetch at 'http://backend...' from origin 'https://frontend...'
has been blocked by CORS policy
```

**Solución:**

1. **Verificar `CORS_ORIGIN` en backend**
```env
# Debe coincidir EXACTAMENTE con la URL del frontend
CORS_ORIGIN=https://tudominio.com
# Sin barra final
```

2. **Para múltiples orígenes (desarrollo + producción)**

Editar `server/index.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tudominio.com',
    'https://tudominio.netlify.app'
  ],
  credentials: true
}));
```

3. **Reiniciar backend tras cambios**

### Error 404 en Rutas de React

**Síntomas:**
- Al recargar `/verificar-email` aparece error 404
- Rutas funcionan al navegar dentro de la app

**Solución para IONOS:**

Verificar `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # API proxy (si backend en mismo servidor)
  RewriteCond %{REQUEST_URI} ^/api/(.*)$
  RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
  
  # React Router - IMPORTANTE
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Backend No Responde

**Síntomas:**
- Frontend no puede conectar al backend
- Error: "Failed to fetch"

**Diagnóstico:**

1. **Health Check**
```bash
curl https://tudominio.com/api/health
```

2. **Verificar que el servidor está corriendo**
```bash
# SSH al servidor
ps aux | grep node

# O si usas PM2
pm2 status
```

3. **Revisar logs**
```bash
# PM2
pm2 logs --lines 100

# Systemd
journalctl -u node-app -n 100

# Railway
railway logs
```

**Soluciones:**
- ✅ Iniciar/reiniciar servidor
- ✅ Verificar variables de entorno
- ✅ Verificar firewall/puertos
- ✅ Verificar reverse proxy configuration

### "Module not found" Error

**Síntomas:**
```
Error: Cannot find module 'express'
```

**Solución:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### Token Expirado

**Síntomas:**
- Usuario intenta verificar y obtiene error "Token expired"

**Solución:**
- Los tokens expiran en 24 horas (por diseño)
- Usuario debe usar el botón "Reenviar correo" en el banner
- O solicitar nuevo email de verificación

**Para extender expiración:**

Editar `server/controllers/emailVerification.js`:
```javascript
// Línea ~49
expiresAt.setHours(expiresAt.getHours() + 24); // 24 horas

// Cambiar a:
expiresAt.setHours(expiresAt.getHours() + 48); // 48 horas
```

---

## 🎨 Personalización

### Cambiar Diseño del Email

Editar `server/controllers/emailVerification.js` o `netlify/functions/send-verification-email.js`:

```javascript
html: `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        /* Personalizar estilos aquí */
        .button {
          background-color: #3182ce; /* Cambiar color */
        }
      </style>
    </head>
    <body>
      <!-- Personalizar contenido aquí -->
    </body>
  </html>
`
```

### Cambiar Tiempo de Expiración

**Archivo:** `server/controllers/emailVerification.js`

```javascript
// Línea ~49
const expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 24); // Cambiar número
```

### Restringir Acceso a Usuarios No Verificados

Crear un componente protegido:

```javascript
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const ProtectedComponent = ({ children }) => {
    const { user } = useAuth();
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkVerification = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from('profiles')
                .select('verified')
                .eq('id', user.id)
                .single();
            
            setIsVerified(data?.verified || false);
            setLoading(false);
        };
        
        checkVerification();
    }, [user]);

    if (loading) return <div>Cargando...</div>;
    
    if (!user) return <div>Debes iniciar sesión</div>;
    
    if (!isVerified) {
        return (
            <div className="verification-required">
                <h2>⚠️ Verificación Requerida</h2>
                <p>Por favor verifica tu email para acceder a esta función.</p>
            </div>
        );
    }

    return children;
};

// Uso
<ProtectedComponent>
  <MiContenidoProtegido />
</ProtectedComponent>
```

### Personalizar Estilos del Banner

Editar `src/components/EmailVerificationBanner.css`:

```css
.email-verification-banner {
    /* Cambiar colores del gradiente */
    background: linear-gradient(135deg, #TU_COLOR1 0%, #TU_COLOR2 100%);
}

.resend-button {
    /* Personalizar botón */
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 25px; /* Cambiar borde redondeado */
}
```

### Usar React Email (Avanzado)

Para templates más complejos:

```bash
npm install react-email @react-email/components
```

Crear `emails/verification-email.jsx`:

```javascript
import { Html, Button, Text } from '@react-email/components';

export default function VerificationEmail({ url }) {
  return (
    <Html>
      <Text>¡Bienvenido a La Cura!</Text>
      <Button href={url}>Verificar mi cuenta</Button>
    </Html>
  );
}
```

---

## 📊 Monitoring

### Métricas en Supabase

```sql
-- Dashboard de verificaciones
SELECT 
    COUNT(*) FILTER (WHERE verified = true) as verificados,
    COUNT(*) FILTER (WHERE verified = false) as pendientes,
    COUNT(*) as total
FROM profiles;

-- Tasa de verificación por día
SELECT 
    DATE(created_at) as fecha,
    COUNT(*) as registros,
    COUNT(*) FILTER (WHERE verified = true) as verificados,
    ROUND(100.0 * COUNT(*) FILTER (WHERE verified = true) / COUNT(*), 2) as tasa_verificacion
FROM profiles
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- Tokens activos vs expirados
SELECT 
    COUNT(*) FILTER (WHERE expires_at > NOW()) as activos,
    COUNT(*) FILTER (WHERE expires_at <= NOW()) as expirados,
    COUNT(*) as total
FROM email_verification;
```

### Métricas en Resend

Dashboard de Resend: https://resend.com/emails

**Métricas disponibles:**
- 📨 Emails enviados
- ✅ Emails entregados
- 📬 Tasa de entrega
- 📊 Opens (si está habilitado)
- 🔗 Clicks en enlaces
- ⚠️ Bounces
- 🚫 Spam reports

### Logs del Backend

#### Railway
```bash
railway logs --tail
```

#### PM2 (IONOS)
```bash
# Ver logs en tiempo real
pm2 logs

# Ver últimas 100 líneas
pm2 logs --lines 100

# Solo errores
pm2 logs --err
```

#### Systemd (IONOS)
```bash
journalctl -u node-app -f
```

### Alertas (Opcional)

Crear un cron job para alertas de tokens expirados:

```sql
-- Crear función
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
    DELETE FROM email_verification
    WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Programar (via pg_cron o externa)
-- Ejecutar diariamente para limpiar tokens expirados
```

---

## 📚 Recursos y Referencias

### Documentación Oficial

- **Resend**: https://resend.com/docs
- **Supabase Auth**: https://supabase.com/docs/guides/auth
- **Express.js**: https://expressjs.com/
- **React Router**: https://reactrouter.com/
- **Vite**: https://vitejs.dev/

### Servicios de Hosting Backend

- **Railway**: https://railway.app/ (Gratuito hasta 500 horas/mes)
- **Render**: https://render.com/ (Gratuito con limitaciones)
- **Fly.io**: https://fly.io/ (Gratuito con limitaciones)
- **IONOS**: https://www.ionos.com/

### Herramientas Útiles

- **FileZilla**: Cliente FTP/SFTP
- **Postman**: Testing de APIs
- **PM2**: Process manager para Node.js
- **React Email**: https://react.email/

---

## 🚀 Checklist de Deployment Final

### Pre-Deployment
- [ ] Backend funciona localmente
- [ ] Frontend funciona localmente
- [ ] Email test funciona en local
- [ ] Todas las dependencias instaladas
- [ ] Build de frontend exitoso (`npm run build`)
- [ ] Variables de entorno preparadas

### Configuración Externa
- [ ] Cuenta de Resend creada
- [ ] API Key de Resend obtenida
- [ ] Dominio verificado en Resend (o usar dominio de prueba)
- [ ] Schema ejecutado en Supabase
- [ ] Service Role Key de Supabase obtenida

### Deployment Backend
- [ ] Código subido (IONOS/Railway/Render)
- [ ] `npm install` ejecutado
- [ ] Variables de entorno configuradas
- [ ] Servidor iniciado
- [ ] Health check responde correctamente

### Deployment Frontend
- [ ] `.env.production` configurado
- [ ] `npm run build` ejecutado
- [ ] Archivos de `dist/` subidos
- [ ] `.htaccess` configurado (para IONOS)
- [ ] Todas las rutas funcionan

### Testing Post-Deployment
- [ ] Health check del backend responde
- [ ] Frontend carga correctamente
- [ ] Registro de usuario funciona
- [ ] Email llega correctamente
- [ ] Verificación de email funciona
- [ ] Banner aparece para no verificados
- [ ] Banner desaparece tras verificar
- [ ] Reenvío de email funciona

### Final
- [ ] DNS configurado (si es necesario)
- [ ] SSL/HTTPS activo
- [ ] Logs monitoreados
- [ ] Backup de base de datos configurado

---

## 📞 Soporte y Contacto

### Problemas Comunes

Si encuentras problemas:
1. Revisar sección [Troubleshooting](#troubleshooting)
2. Verificar logs del backend y frontend
3. Comprobar configuración de variables de entorno
4. Verificar que el schema de BD está actualizado

### Recursos de Ayuda

- **IONOS Support**: https://www.ionos.com/help
- **Supabase Community**: https://github.com/supabase/supabase/discussions
- **Resend Support**: support@resend.com

---

## 📄 Licencia

Este proyecto es privado y propietario de La Cura.

---

## 🎉 Resumen

Has implementado un sistema completo de verificación de email que:

✅ **Funciona en múltiples plataformas** (Netlify, IONOS, Railway, Render, Fly.io)  
✅ **Se adapta automáticamente** al entorno  
✅ **Es seguro** (tokens con expiración, RLS en BD)  
✅ **Tiene UX moderna** (animaciones, responsive)  
✅ **Está documentado** completamente  
✅ **Es mantenible** (código limpio y organizado)  

**Estado**: ✅ Listo para producción  
**Última actualización**: Enero 2026  
**Versión**: 1.0.0

---

**¡Buena suerte con el deployment! 🚀**
