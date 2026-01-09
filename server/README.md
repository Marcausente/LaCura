# 🔌 La Cura - Backend API

Backend API para el sistema de verificación de email de La Cura.

## 📋 Descripción

API REST construida con **Express.js** que maneja:
- ✅ Envío de emails de verificación via Resend
- ✅ Validación de tokens de verificación
- ✅ Integración con Supabase

## 🚀 Quick Start

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
PORT=3000
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
RESEND_API_KEY=re_tu_api_key
RESEND_FROM_EMAIL=noreply@tudominio.com
FRONTEND_URL=http://localhost:5173
```

### 3. Iniciar Servidor

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "La Cura API is running",
  "timestamp": "2026-01-09T..."
}
```

### Send Verification Email
```
POST /api/send-verification-email
```

**Request Body:**
```json
{
  "userId": "uuid",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent successfully",
  "emailId": "..."
}
```

### Verify Email
```
POST /api/verify-email
GET /api/verify-email?token=xxx
```

**Request Body (POST):**
```json
{
  "token": "verification-token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

## 🗂️ Estructura del Proyecto

```
server/
├── index.js                      # Servidor principal
├── controllers/
│   └── emailVerification.js     # Lógica de verificación
├── package.json                  # Dependencias
├── .env.example                  # Ejemplo de variables
├── .gitignore                    # Archivos ignorados
└── README.md                     # Esta documentación
```

## 🔐 Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `PORT` | Puerto del servidor | No (default: 3000) |
| `NODE_ENV` | Entorno (development/production) | No |
| `CORS_ORIGIN` | Origen permitido para CORS | No (default: *) |
| `VITE_SUPABASE_URL` | URL de tu proyecto Supabase | ✅ Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase | ✅ Sí |
| `RESEND_API_KEY` | API Key de Resend | ✅ Sí |
| `RESEND_FROM_EMAIL` | Email verificado del remitente | ✅ Sí |
| `FRONTEND_URL` | URL del frontend | ✅ Sí |

## 🧪 Testing

### Test Manual

1. **Health Check:**
```bash
curl http://localhost:3000/api/health
```

2. **Enviar Email de Verificación:**
```bash
curl -X POST http://localhost:3000/api/send-verification-email \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-uuid",
    "email": "test@example.com"
  }'
```

3. **Verificar Email:**
```bash
curl -X POST http://localhost:3000/api/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "token-from-email"}'
```

## 🚀 Deployment

### IONOS

Ver la guía completa: [DEPLOYMENT_IONOS.md](../DEPLOYMENT_IONOS.md)

**Resumen:**
1. Subir código via FTP/SSH
2. Instalar dependencias: `npm install --production`
3. Configurar variables de entorno
4. Iniciar: `node index.js`

### Otras Plataformas

#### Railway.app
```bash
railway login
railway init
railway up
```

#### Render.com
- Build Command: `npm install`
- Start Command: `node index.js`

#### Fly.io
```bash
fly launch
fly deploy
```

## 🔒 Seguridad

- ✅ CORS configurado
- ✅ Service Role Key solo en servidor
- ✅ Validación de inputs
- ✅ Tokens con expiración
- ✅ Manejo de errores

## 📦 Dependencias

```json
{
  "express": "^4.18.2",          // Framework web
  "cors": "^2.8.5",              // CORS middleware
  "dotenv": "^16.3.1",           // Variables de entorno
  "resend": "^3.2.0",            // Cliente de Resend
  "@supabase/supabase-js": "^2.39.0"  // Cliente de Supabase
}
```

## 🐛 Troubleshooting

### Puerto en uso
```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# Matar proceso
kill -9 <PID>
```

### Error de módulos
```bash
rm -rf node_modules package-lock.json
npm install
```

### Ver logs en producción
```bash
# Si usas pm2
pm2 logs

# Si usas systemd
journalctl -u node-app -f
```

## 📚 Recursos

- [Express Documentation](https://expressjs.com/)
- [Resend API Docs](https://resend.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)

---

**Versión**: 1.0.0  
**Node.js**: >= 18.0.0  
**Licencia**: Private
