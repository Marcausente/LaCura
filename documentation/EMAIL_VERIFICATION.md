# 📧 La Cura - Sistema de Verificación de Email

> Sistema completo de verificación de email con Resend para deployment en IONOS

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4-lightgrey.svg)](https://expressjs.com/)

---

## 📑 Tabla de Contenidos

1. [Introducción](#-introducción)
2. [Quick Start](#-quick-start-5-pasos)
3. [Requisitos](#-requisitos)
4. [Instalación](#-instalación)
5. [Configuración](#️-configuración)
6. [Desarrollo Local](#-desarrollo-local)
7. [Backend API](#-backend-api)
8. [Deployment en IONOS](#-deployment-en-ionos)
9. [Testing](#-testing)
10. [Troubleshooting](#-troubleshooting)
11. [Personalización](#-personalización)
12. [Monitoreo](#-monitoreo)

---

## 🎯 Introducción

Sistema completo de verificación de email que:

✅ Envía correos de verificación automáticamente al registrarse  
✅ Muestra un banner para usuarios no verificados  
✅ Permite reenviar emails de verificación  
✅ Verifica cuentas mediante enlaces seguros con tokens  
✅ Diseñado específicamente para **IONOS**  

### Características

- 🎨 **UI Moderna**: Banner con gradiente, animaciones suaves
- 📧 **Email Profesional**: Template responsive en español
- 🔒 **Seguro**: Tokens UUID con expiración de 24 horas
- 📱 **Responsive**: Diseño adaptado a móvil y desktop
- 🚀 **Simple**: Backend Express.js estándar
- ⚡ **Rápido**: Setup en menos de 15 minutos

### Arquitectura

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  Frontend React  │
│  (IONOS)         │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Backend API     │
│  Express.js      │
│  (IONOS / Ext.)  │
└──────┬───────────┘
       │
       ├──► Supabase (Database)
       │
       └──► Resend (Email)
```

---

## ⚡ Quick Start (5 Pasos)

### 1️⃣ Configurar Servicios Externos (5 min)

**Resend:**
1. Ir a [resend.com](https://resend.com)
2. Crear cuenta
3. Copiar API Key

**Supabase:**
1. Ir a tu proyecto Supabase
2. SQL Editor > Pegar `database/schema.sql`
3. Ejecutar
4. Settings > API > Copiar URL y Service Role Key

### 2️⃣ Configurar Variables de Entorno (2 min)

**Frontend (.env):**
```bash
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_API_URL=http://localhost:3000/api
EOF
```

**Backend (server/.env):**
```bash
cat > server/.env << 'EOF'
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
RESEND_API_KEY=re_tu_api_key
RESEND_FROM_EMAIL=noreply@tudominio.com
FRONTEND_URL=http://localhost:5173
EOF
```

### 3️⃣ Instalar Dependencias (2 min)

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

### 4️⃣ Iniciar Servidores (30 seg)

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
npm run dev
```

Abrir: `http://localhost:5173`

### 5️⃣ Probar (1 min)

1. Registrar usuario
2. Revisar email (incluir carpeta spam)
3. Click "Verificar mi cuenta"
4. ✅ ¡Verificado!

---

## 📋 Requisitos

### Servicios Externos

| Servicio | Propósito | Plan | Enlace |
|----------|-----------|------|--------|
| **Supabase** | Base de datos y auth | Gratuito | [supabase.com](https://supabase.com) |
| **Resend** | Envío de emails | Gratuito | [resend.com](https://resend.com) |
| **IONOS** | Hosting | Variable | [ionos.com](https://ionos.com) |

### Tecnologías

- **Frontend**: React 18 + Vite
- **Backend**: Node.js 18+ + Express 4
- **Base de Datos**: PostgreSQL (Supabase)
- **Email**: Resend API

---

## 📁 Estructura del Proyecto

```
LaCura/
│
├── 📄 README.md                    # Esta documentación
├── 🔧 .env.example                 # Template variables frontend
├── 📦 package.json                 # Dependencies frontend
│
├── 🎨 src/                         # Frontend (React)
│   ├── config/
│   │   └── api.js                  # Configuración API
│   ├── components/
│   │   ├── EmailVerificationBanner.jsx  # Banner verificación
│   │   ├── EmailVerificationBanner.css
│   │   ├── VerificarEmail.jsx           # Página verificación
│   │   ├── VerificarEmail.css
│   │   ├── AuthModal.jsx                # Modal registro/login
│   │   ├── AuthModal.css
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx              # Contexto autenticación
│   └── ...
│
├── 🟢 server/                      # Backend (Express)
│   ├── index.js                    # Servidor principal
│   ├── controllers/
│   │   └── emailVerification.js   # Lógica de emails
│   ├── package.json                # Dependencies backend
│   └── .env.example                # Template variables backend
│
├── 🗄️ database/
│   └── schema.sql                  # Schema Supabase
│
└── 📱 public/                      # Assets públicos
```

---

## 🔧 Instalación

### 1. Clonar/Descargar Proyecto

```bash
cd LaCura
```

### 2. Instalar Dependencias

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

---

## ⚙️ Configuración

### Paso 1: Configurar Resend

1. Crear cuenta en [resend.com](https://resend.com)
2. **Verificar tu dominio** (Recomendado)
   - Dashboard > Domains > Add Domain
   - Seguir instrucciones DNS
   
3. **O usar dominio de prueba:**
   - `onboarding@resend.dev` (solo para testing)

4. **Obtener API Key:**
   - Dashboard > API Keys > Create API Key
   - Copiar y guardar

### Paso 2: Configurar Supabase

#### A. Ejecutar Schema

1. Ir a Supabase Dashboard
2. Abrir **SQL Editor**
3. Copiar contenido de `database/schema.sql`
4. Click **Run**

Esto crea:
- ✅ Columna `verified` en tabla `profiles`
- ✅ Tabla `email_verification` para tokens
- ✅ Políticas RLS necesarias

#### B. Obtener Credenciales

En Supabase Dashboard > Settings > API:

| Credencial | Ubicación | Uso |
|------------|-----------|-----|
| **Project URL** | Settings > API | Frontend + Backend |
| **Anon Key** | Settings > API > Project API keys | Frontend |
| **Service Role Key** | Settings > API > Project API keys | Backend (¡Sensible!) |

⚠️ **IMPORTANTE:** `Service Role Key` es muy sensible - solo usar en backend.

### Paso 3: Configurar Variables de Entorno

#### Frontend (.env)

Crear archivo `.env` en la raíz del proyecto:

```env
# Supabase (claves públicas)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API Backend
# Desarrollo:
VITE_API_URL=http://localhost:3000/api
# Producción (si backend en mismo dominio):
# VITE_API_URL=/api
# Producción (si backend separado):
# VITE_API_URL=https://tu-backend.railway.app/api
```

#### Backend (server/.env)

Crear archivo `server/.env`:

```env
# Servidor
PORT=3000
NODE_ENV=development

# CORS (debe coincidir con URL del frontend)
CORS_ORIGIN=http://localhost:5173

# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@tudominio.com

# Frontend URL (para enlaces de verificación en emails)
FRONTEND_URL=http://localhost:5173
```

**⚠️ Seguridad:**
- ❌ Nunca subir archivos `.env` a Git
- ❌ Nunca exponer `SUPABASE_SERVICE_ROLE_KEY`
- ✅ Usar diferentes valores en dev/prod

---

## 💻 Desarrollo Local

### 1. Iniciar Backend

```bash
cd server
npm run dev
```

**Output esperado:**
```
🚀 La Cura API running on port 3000
📧 Email verification endpoints ready
🔗 Health check: http://localhost:3000/api/health
```

### 2. Iniciar Frontend

En otra terminal:

```bash
npm run dev
```

**Output esperado:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Abrir navegador en: `http://localhost:5173`

### 3. Verificar Configuración

Abrir consola del navegador, deberías ver:

```
🔧 API Configuration: {
  baseUrl: "http://localhost:3000/api",
  environment: "development",
  endpoints: {...}
}
```

### 4. Probar el Sistema

**Flujo completo:**

1. **Registrar usuario:**
   - Click en "Registrarse"
   - Completar formulario
   - Email: usar uno real para recibir el correo
   - ✅ Debe mostrar mensaje de éxito

2. **Verificar email enviado:**
   - Revisar bandeja de entrada
   - Revisar carpeta SPAM (importante)
   - Email debe llegar en menos de 1 minuto

3. **Verificar cuenta:**
   - Abrir email recibido
   - Click en "Verificar mi cuenta"
   - ✅ Debe mostrar página de éxito
   - ✅ Redirige a inicio tras 3 segundos

4. **Verificar banner:**
   - Sin verificar: banner debe aparecer
   - Tras verificar: banner debe desaparecer
   - Probar botón "Reenviar correo"

---

## 🔌 Backend API

### Endpoints Disponibles

#### 1. Health Check

```http
GET /api/health
```

**Descripción:** Verifica que el servidor está funcionando.

**Response 200:**
```json
{
  "status": "ok",
  "message": "La Cura API is running",
  "timestamp": "2026-01-09T10:00:00.000Z"
}
```

**Ejemplo:**
```bash
curl http://localhost:3000/api/health
```

---

#### 2. Send Verification Email

```http
POST /api/send-verification-email
Content-Type: application/json
```

**Descripción:** Envía un email de verificación a un usuario.

**Request Body:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "usuario@example.com"
}
```

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Verification email sent successfully",
  "emailId": "abc123..."
}
```

**Response 400 (Bad Request):**
```json
{
  "error": "Missing required fields: userId and email"
}
```

**Response 500 (Server Error):**
```json
{
  "error": "Error sending verification email"
}
```

**Ejemplo:**
```bash
curl -X POST http://localhost:3000/api/send-verification-email \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com"
  }'
```

---

#### 3. Verify Email

```http
POST /api/verify-email
Content-Type: application/json
```

**O via GET:**
```http
GET /api/verify-email?token=<token>
```

**Descripción:** Verifica un token de email y marca la cuenta como verificada.

**Request Body (POST):**
```json
{
  "token": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response 200 (Success):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Response 400 (Token Expired):**
```json
{
  "error": "Verification token has expired"
}
```

**Response 404 (Invalid Token):**
```json
{
  "error": "Invalid or expired verification token"
}
```

**Ejemplo:**
```bash
# POST
curl -X POST http://localhost:3000/api/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "550e8400-e29b-41d4-a716-446655440000"}'

# GET
curl http://localhost:3000/api/verify-email?token=550e8400-e29b-41d4-a716-446655440000
```

---

### Variables de Entorno del Backend

| Variable | Descripción | Requerido | Default |
|----------|-------------|-----------|---------|
| `PORT` | Puerto del servidor | No | `3000` |
| `NODE_ENV` | Entorno (development/production) | No | `development` |
| `CORS_ORIGIN` | Origen permitido para CORS | No | `*` |
| `VITE_SUPABASE_URL` | URL de Supabase | ✅ Sí | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | ✅ Sí | - |
| `RESEND_API_KEY` | API Key de Resend | ✅ Sí | - |
| `RESEND_FROM_EMAIL` | Email verificado del remitente | ✅ Sí | - |
| `FRONTEND_URL` | URL del frontend (para emails) | ✅ Sí | - |

---

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

## 🏢 Deployment en IONOS

### Opción A: Todo en IONOS (Si tienes plan con Node.js)

#### 1. Preparar Backend

**Comprimir código:**
```bash
cd server
zip -r backend.zip . -x "node_modules/*" -x ".env"
```

**Subir a IONOS:**
1. Conectar via FTP/SFTP o SSH
2. Subir archivos a `/node-app/` (o directorio configurado)
3. **NO** subir `node_modules/` ni `.env`

**Instalar dependencias via SSH:**
```bash
ssh usuario@tu-servidor.ionos.com
cd /node-app
npm install --production
```

#### 2. Configurar Variables Backend

En Panel IONOS > Node.js Settings > Environment Variables:

```env
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://tudominio.com
VITE_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@tudominio.com
FRONTEND_URL=https://tudominio.com
```

⚠️ **IMPORTANTE:** Verificar que todas las variables están correctas.

#### 3. Iniciar Backend

En Panel IONOS:
1. Start Command: `node index.js`
2. Click **"Start Application"**
3. Verificar estado: **"Running"**

#### 4. Configurar Reverse Proxy

Para acceder al backend en `https://tudominio.com/api`:

**Panel IONOS > Domains & SSL > Domain Settings:**
1. Crear regla **Reverse Proxy**:
   - **Source**: `https://tudominio.com/api/*`
   - **Target**: `http://localhost:3000/api/*`
2. Guardar configuración

#### 5. Build Frontend

**Crear `.env.production`:**
```bash
cat > .env.production << 'EOF'
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_API_URL=/api
EOF
```

**Build:**
```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos.

#### 6. Subir Frontend

**Via FTP:**
1. Conectar al servidor IONOS
2. Ir a `/htdocs` o `/public_html`
3. **Borrar** contenido existente
4. **Subir** todo el contenido de `dist/`

#### 7. Configurar .htaccess

Crear archivo `.htaccess` en `/htdocs`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Proxy API requests to backend
  RewriteCond %{REQUEST_URI} ^/api/(.*)$
  RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
  
  # Handle React Router (SPA)
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### Opción B: Frontend IONOS + Backend Externo (Recomendado)

**Ventajas:**
- ✅ Funciona en cualquier plan de IONOS
- ✅ Backend en servicio gratuito
- ✅ Más flexible y escalable

#### 1. Deploy Backend en Railway (Gratuito)

**Instalar Railway CLI:**
```bash
npm i -g @railway/cli
```

**Login y deploy:**
```bash
cd server
railway login
railway init
railway up
```

**Configurar variables en Railway:**
1. Ir a proyecto en Railway Dashboard
2. Click en **"Variables"**
3. Añadir todas las variables:

```env
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://tudominio.com
VITE_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@tudominio.com
FRONTEND_URL=https://tudominio.com
```

**Obtener URL del backend:**
```bash
railway open
# URL: https://tu-backend.railway.app
```

#### 2. Deploy Frontend en IONOS

**Crear `.env.production`:**
```bash
cat > .env.production << 'EOF'
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_API_URL=https://tu-backend.railway.app/api
EOF
```

**Build:**
```bash
npm run build
```

**Subir a IONOS:**
1. Via FTP a `/htdocs`
2. Subir contenido de `dist/`

**Crear `.htaccess`:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle React Router (SPA)
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### Servicios Alternativos para Backend

#### Render.com (Gratuito)

1. Crear cuenta en [render.com](https://render.com)
2. Click **"New Web Service"**
3. Conectar tu repositorio Git
4. Configuración:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `node server/index.js`
5. Añadir variables de entorno en dashboard

#### Fly.io (Gratuito)

```bash
# Instalar Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
cd server
fly launch
fly deploy
```

Configurar variables via `fly secrets set`

---

## 🧪 Testing

### Testing Local

#### 1. Health Check del Backend

```bash
curl http://localhost:3000/api/health
```

**Esperado:**
```json
{"status":"ok","message":"La Cura API is running","timestamp":"..."}
```

#### 2. Test de Registro

1. Abrir `http://localhost:5173`
2. Click **"Registrarse"**
3. Completar formulario
4. ✅ Mensaje de éxito debe aparecer

#### 3. Test de Email

1. Revisar inbox del email usado
2. Revisar carpeta **SPAM** (importante)
3. ✅ Email debe llegar en 1-2 minutos
4. Verificar diseño y contenido

#### 4. Test de Verificación

1. Abrir email recibido
2. Click en **"Verificar mi cuenta"**
3. ✅ Página de éxito debe mostrarse
4. ✅ Redirige a inicio tras 3 segundos

#### 5. Test de Banner

1. Crear usuario y NO verificar
2. Hacer login
3. ✅ Banner debe aparecer arriba
4. Click **"Reenviar correo"**
5. ✅ Nuevo email debe llegar
6. Verificar email
7. Recargar página
8. ✅ Banner debe desaparecer

---

### Testing en Producción

#### 1. Backend Health Check

```bash
curl https://tudominio.com/api/health
```

#### 2. Flujo Completo

1. Registrar usuario con email real
2. Verificar que email llega
3. Click en enlace de verificación
4. Verificar que funciona correctamente
5. Verificar que banner desaparece

---

### Testing de Endpoints (curl)

**Send Verification Email:**
```bash
curl -X POST https://tudominio.com/api/send-verification-email \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "uuid-valido",
    "email": "test@example.com"
  }'
```

**Verify Email:**
```bash
curl -X POST https://tudominio.com/api/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "token-from-email"}'
```

---

## 🔧 Troubleshooting

### 1. Emails No Llegan

**Síntomas:**
- Usuario se registra pero no recibe email
- No hay errores visibles

**Diagnóstico:**

1. **Verificar API Key de Resend:**
```bash
# Ver variable en backend
echo $RESEND_API_KEY
```

2. **Verificar dominio en Resend:**
   - Dashboard > Domains
   - Verificar que dominio está verificado
   - O usar `onboarding@resend.dev` para pruebas

3. **Revisar logs del backend:**
```bash
# Local: ver terminal del backend

# Railway:
railway logs

# PM2 (IONOS):
pm2 logs

# Systemd:
journalctl -u node-app -f
```

4. **Probar Resend directamente:**
```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer re_tu_api_key' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "tu@email.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

**Soluciones:**
- ✅ Verificar que `RESEND_API_KEY` es correcta
- ✅ Usar dominio verificado
- ✅ Revisar carpeta SPAM
- ✅ Verificar Dashboard de Resend: https://resend.com/emails

---

### 2. Banner No Desaparece

**Síntomas:**
- Usuario verifica email pero banner sigue apareciendo

**Diagnóstico:**

```sql
-- En Supabase SQL Editor
SELECT id, verified FROM profiles WHERE id = 'USER_ID';
```

**Soluciones:**
- ✅ Recargar página con `Ctrl + F5` (hard reload)
- ✅ Verificar que `verified = true` en base de datos
- ✅ Logout y login de nuevo
- ✅ Limpiar caché del navegador
- ✅ Verificar que token se procesó (debe estar eliminado de `email_verification`)

```sql
-- El token NO debe existir tras verificar
SELECT * FROM email_verification WHERE profile_id = 'USER_ID';
```

---

### 3. CORS Error

**Síntoma:**
```
Access to fetch at 'http://backend...' from origin 'https://frontend...'
has been blocked by CORS policy
```

**Diagnóstico:**

Verificar que `CORS_ORIGIN` coincide con URL del frontend:

```env
# ❌ Incorrecto
CORS_ORIGIN=https://tudominio.com/

# ✅ Correcto
CORS_ORIGIN=https://tudominio.com
```

**Solución:**

1. **Editar `server/.env`:**
```env
CORS_ORIGIN=https://tudominio.com
```

2. **Para múltiples orígenes, editar `server/index.js`:**
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tudominio.com',
    'https://www.tudominio.com'
  ],
  credentials: true
}));
```

3. **Reiniciar backend**

---

### 4. Error 404 en Rutas

**Síntomas:**
- Al recargar `/verificar-email` aparece error 404
- Funciona al navegar dentro de la app

**Diagnóstico:**

Verificar que `.htaccess` existe y tiene el contenido correcto.

**Solución:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # React Router - IMPORTANTE
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### 5. Backend No Responde

**Síntomas:**
- Frontend no puede conectar al backend
- Error: "Failed to fetch"

**Diagnóstico:**

1. **Health check:**
```bash
curl https://tudominio.com/api/health
```

2. **Verificar que servidor está corriendo:**
```bash
# SSH al servidor
ps aux | grep node

# PM2
pm2 status
```

3. **Revisar logs:**
```bash
pm2 logs --lines 100
```

**Soluciones:**
- ✅ Iniciar/reiniciar servidor
- ✅ Verificar variables de entorno
- ✅ Verificar firewall/puertos
- ✅ Verificar configuración de reverse proxy

---

### 6. Token Expirado

**Síntomas:**
- Usuario intenta verificar y obtiene "Token expired"

**Explicación:**
- Los tokens expiran en 24 horas (por diseño de seguridad)

**Solución:**
- Usuario debe usar botón **"Reenviar correo"** en el banner
- Se generará un nuevo token válido

**Para cambiar tiempo de expiración:**

Editar `server/controllers/emailVerification.js`:

```javascript
// Línea ~35
const expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 24); // Cambiar este número

// Ejemplos:
// 12 horas: + 12
// 48 horas: + 48
// 7 días: + (24 * 7)
```

---

### 7. Module Not Found

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

---

## 🎨 Personalización

### 1. Cambiar Diseño del Email

Editar `server/controllers/emailVerification.js` (línea ~60):

```javascript
html: `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        /* Personalizar colores */
        .button {
          background-color: #TU_COLOR; /* Cambiar aquí */
        }
        .logo h1 {
          color: #TU_COLOR; /* Y aquí */
        }
      </style>
    </head>
    <body>
      <!-- Personalizar contenido -->
      <div class="container">
        <div class="logo">
          <h1>🌟 Tu Marca</h1>
        </div>
        <!-- ... resto del contenido ... -->
      </div>
    </body>
  </html>
`
```

---

### 2. Cambiar Tiempo de Expiración de Tokens

Editar `server/controllers/emailVerification.js` (línea ~35):

```javascript
const expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 24); // Cambiar número

// Opciones:
// 6 horas: + 6
// 12 horas: + 12
// 48 horas: + 48
// 7 días: + (24 * 7)
// 30 días: + (24 * 30)
```

---

### 3. Restringir Acceso a No Verificados

Crear componente protegido:

```jsx
// src/components/RequireVerification.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

export const RequireVerification = ({ children }) => {
  const { user } = useAuth();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkVerification() {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('verified')
        .eq('id', user.id)
        .single();

      setVerified(data?.verified || false);
      setLoading(false);
    }

    checkVerification();
  }, [user]);

  if (loading) return <div>Cargando...</div>;
  
  if (!verified) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#fff5f5',
        borderRadius: '8px',
        margin: '2rem'
      }}>
        <h2>⚠️ Verificación Requerida</h2>
        <p>Por favor verifica tu email para acceder a esta función.</p>
        <p>Revisa tu bandeja de entrada y la carpeta de spam.</p>
      </div>
    );
  }

  return children;
};
```

**Uso en App.jsx:**

```jsx
import { RequireVerification } from './components/RequireVerification';

<Route 
  path="/pago.html" 
  element={
    <RequireVerification>
      <Pago />
    </RequireVerification>
  } 
/>
```

---

### 4. Personalizar Estilos del Banner

Editar `src/components/EmailVerificationBanner.css`:

```css
.email-verification-banner {
  /* Cambiar colores del gradiente */
  background: linear-gradient(135deg, #TU_COLOR1 0%, #TU_COLOR2 100%);
  
  /* Cambiar padding */
  padding: 1.5rem; /* Ajustar aquí */
}

.banner-icon {
  /* Cambiar icono */
  font-size: 2.5rem; /* Tamaño del emoji */
}

.resend-button {
  /* Personalizar botón */
  background-color: rgba(255, 255, 255, 0.3);
  border: 2px solid white;
  border-radius: 30px; /* Más/menos redondeado */
}

.resend-button:hover:not(:disabled) {
  background-color: white;
  color: #TU_COLOR; /* Color al hacer hover */
}
```

---

### 5. Cambiar Textos del Banner

Editar `src/components/EmailVerificationBanner.jsx` (línea ~68):

```jsx
<div className="banner-text">
  <strong>Tu título personalizado</strong>
  <p>Tu mensaje personalizado aquí.</p>
</div>
```

---

## 📊 Monitoreo

### Queries Útiles en Supabase

**Dashboard de verificaciones:**
```sql
SELECT 
  COUNT(*) FILTER (WHERE verified = true) as verificados,
  COUNT(*) FILTER (WHERE verified = false) as pendientes,
  COUNT(*) as total,
  ROUND(100.0 * COUNT(*) FILTER (WHERE verified = true) / COUNT(*), 2) as porcentaje_verificacion
FROM profiles;
```

**Tasa de verificación por día:**
```sql
SELECT 
  DATE(created_at) as fecha,
  COUNT(*) as registros,
  COUNT(*) FILTER (WHERE verified = true) as verificados,
  ROUND(100.0 * COUNT(*) FILTER (WHERE verified = true) / COUNT(*), 2) as tasa
FROM profiles
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;
```

**Tokens activos vs expirados:**
```sql
SELECT 
  COUNT(*) FILTER (WHERE expires_at > NOW()) as activos,
  COUNT(*) FILTER (WHERE expires_at <= NOW()) as expirados,
  COUNT(*) as total
FROM email_verification;
```

**Limpiar tokens expirados:**
```sql
DELETE FROM email_verification WHERE expires_at < NOW();
```

**Usuarios sin verificar (más de 7 días):**
```sql
SELECT 
  p.id,
  p.nombre,
  p.apellidos,
  au.email,
  au.created_at as registro,
  NOW() - au.created_at as tiempo_sin_verificar
FROM profiles p
JOIN auth.users au ON au.id = p.id
WHERE p.verified = false
  AND au.created_at < NOW() - INTERVAL '7 days'
ORDER BY au.created_at ASC;
```

---

### Monitorear Emails en Resend

Dashboard: https://resend.com/emails

**Métricas disponibles:**
- 📨 Total de emails enviados
- ✅ Tasa de entrega
- 📬 Emails entregados
- ⚠️ Bounces (rebotes)
- 🚫 Spam reports
- 📊 Opens (si está habilitado tracking)
- 🔗 Clicks en enlaces

---

### Logs del Backend

**Railway:**
```bash
railway logs --tail
railway logs --lines 100
```

**PM2 (IONOS):**
```bash
# Tiempo real
pm2 logs

# Últimas 100 líneas
pm2 logs --lines 100

# Solo errores
pm2 logs --err
```

**Systemd:**
```bash
journalctl -u node-app -f
journalctl -u node-app -n 100
```

---

## 🔐 Seguridad

### Buenas Prácticas Implementadas

✅ **Tokens seguros:**
- UUID v4 (cryptographically secure)
- Expiración automática (24 horas)
- Un solo uso (se eliminan tras verificar)

✅ **Base de datos:**
- Row Level Security (RLS) activo
- Service Role Key solo en backend
- Políticas de acceso granulares

✅ **Variables de entorno:**
- Nunca commiteadas a Git
- Diferentes valores dev/prod
- Service Role Key nunca expuesta

✅ **CORS:**
- Configurado específicamente
- Solo orígenes permitidos

✅ **Validación:**
- Inputs validados en backend
- Errores manejados adecuadamente

---

## 📦 Dependencias

### Frontend

```json
{
  "@supabase/supabase-js": "^2.88.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.10.1"
}
```

### Backend

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "resend": "^3.2.0",
  "@supabase/supabase-js": "^2.39.0"
}
```

---

## ✅ Checklist de Deployment

### Pre-Deployment
- [ ] Backend funciona localmente
- [ ] Frontend funciona localmente
- [ ] Email test exitoso
- [ ] Variables de entorno preparadas
- [ ] Build de frontend exitoso

### Servicios Externos
- [ ] Cuenta Resend creada
- [ ] API Key Resend obtenida
- [ ] Dominio verificado en Resend (o usar test)
- [ ] Schema ejecutado en Supabase
- [ ] Service Role Key obtenida

### Backend
- [ ] Código subido (IONOS/Railway/Render)
- [ ] Dependencies instaladas
- [ ] Variables de entorno configuradas
- [ ] Servidor iniciado
- [ ] Health check responde OK

### Frontend
- [ ] `.env.production` configurado
- [ ] Build ejecutado (`npm run build`)
- [ ] Archivos `dist/` subidos a IONOS
- [ ] `.htaccess` configurado
- [ ] Todas las rutas funcionan

### Testing Final
- [ ] Health check del backend
- [ ] Registro de usuario
- [ ] Email llega
- [ ] Verificación funciona
- [ ] Banner aparece/desaparece
- [ ] Reenvío de email funciona

---

## 📞 Soporte y Recursos

### Documentación Oficial

- **Resend**: https://resend.com/docs
- **Supabase**: https://supabase.com/docs
- **Express**: https://expressjs.com/
- **React Router**: https://reactrouter.com/
- **Vite**: https://vitejs.dev/

### Soporte IONOS

- Panel: https://my.ionos.com
- Documentación: https://www.ionos.com/help
- Soporte: 24/7 disponible

### Comunidades

- **Supabase Discord**: https://discord.supabase.com
- **Resend Twitter**: @resend
- **Stack Overflow**: Etiqueta `resend`, `supabase`, `express`

---

## 🎉 Resumen

Has implementado un sistema completo de verificación de email:

✅ **Backend Express.js** portable y estándar  
✅ **Frontend React** moderno y responsive  
✅ **Emails profesionales** vía Resend  
✅ **Base de datos** segura en Supabase  
✅ **Listo para IONOS** con múltiples opciones de deployment  
✅ **Documentación completa** en un solo lugar  

**Estado**: ✅ Producción Ready  
**Plataforma**: IONOS  
**Versión**: 1.0.0  
**Última actualización**: Enero 2026  

---

**¡Éxito con tu deployment! 🚀**

Si tienes dudas, revisa las secciones de **Troubleshooting** o **Testing**.
