/**
 * Supabase Edge Function para enviar emails de verificación
 * 
 * INSTALACIÓN:
 * 1. Instala Supabase CLI: npm install -g supabase
 * 2. Crea la función: supabase functions new send-verification-email
 * 3. Copia este código en supabase/functions/send-verification-email/index.ts
 * 4. Configura las variables de entorno en Supabase Dashboard
 * 5. Despliega: supabase functions deploy send-verification-email
 * 
 * VARIABLES DE ENTORNO NECESARIAS:
 * - RESEND_API_KEY (si usas Resend)
 * - SENDGRID_API_KEY (si usas SendGrid)
 * - FROM_EMAIL: email desde el que se enviarán los correos
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejo de CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, userName, verificationUrl } = await req.json()

    // Validación
    if (!to || !verificationUrl) {
      throw new Error('Missing required fields')
    }

    // OPCIÓN 1: Usando Resend (recomendado)
    // Instalar: npm install resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@lacura.com'

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const emailHtml = getVerificationEmailTemplate(userName || 'Usuario', verificationUrl)
    const emailText = getVerificationEmailText(userName || 'Usuario', verificationUrl)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `La Cura <${FROM_EMAIL}>`,
        to: [to],
        subject: 'Verifica tu email - La Cura',
        html: emailHtml,
        text: emailText
      })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(data)}`)
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})

// Plantilla HTML del email
function getVerificationEmailTemplate(userName: string, verificationUrl: string): string {
  return \`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu email - La Cura</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">La Cura</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333333; margin-top: 0; font-size: 24px;">¡Hola \${userName}!</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                                Gracias por registrarte en La Cura. Para completar tu registro y acceder a todas las funcionalidades, 
                                por favor verifica tu dirección de email haciendo clic en el botón de abajo.
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="\${verificationUrl}" 
                                           style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                                            Verificar mi email
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #666666; font-size: 14px; line-height: 1.6;">
                                Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                            </p>
                            <p style="color: #667eea; font-size: 13px; word-break: break-all;">
                                \${verificationUrl}
                            </p>
                            <p style="color: #999999; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                                Este enlace expirará en 24 horas. Si no solicitaste este registro, puedes ignorar este email.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 20px; text-align: center;">
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                © \${new Date().getFullYear()} La Cura. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  \`
}

// Texto plano del email
function getVerificationEmailText(userName: string, verificationUrl: string): string {
  return \`
Hola \${userName},

Gracias por registrarte en La Cura. Para completar tu registro, por favor verifica tu email visitando el siguiente enlace:

\${verificationUrl}

Este enlace expirará en 24 horas.

Si no solicitaste este registro, puedes ignorar este email.

Saludos,
El equipo de La Cura
  \`
}

