/**
 * Email Verification Service
 * 
 * Este archivo contiene las funciones para enviar emails de verificación.
 * En producción, deberás configurar un servicio de email como:
 * - Supabase Email (configurado en el dashboard)
 * - SendGrid
 * - Resend
 * - AWS SES
 * - Mailgun
 */

import { supabase } from '../supabaseClient';

/**
 * Envía un email de verificación al usuario
 * @param {string} userEmail - Email del usuario
 * @param {string} userName - Nombre del usuario (opcional)
 * @param {string} verificationToken - Token de verificación
 * @returns {Promise<boolean>} - True si se envió correctamente
 */
export const sendVerificationEmail = async (userEmail, userName, verificationToken) => {
    try {
        // URL de verificación
        const verificationUrl = `${window.location.origin}/verificar-email?token=${verificationToken}`;
        
        // Aquí es donde integrarías con tu servicio de email
        // OPCIÓN 1: Usar Supabase Edge Functions
        // Necesitarás crear una Edge Function que envíe el email
        const { data, error } = await supabase.functions.invoke('send-verification-email', {
            body: {
                to: userEmail,
                userName: userName || 'Usuario',
                verificationUrl: verificationUrl
            }
        });
        
        if (error) {
            console.error('Error sending verification email:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error in sendVerificationEmail:', error);
        return false;
    }
};

/**
 * Plantilla HTML del email de verificación
 * Esta plantilla se usaría en tu servicio de email
 */
export const getVerificationEmailTemplate = (userName, verificationUrl) => {
    return `
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
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">La Cura</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333333; margin-top: 0; font-size: 24px;">¡Hola ${userName}!</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                                Gracias por registrarte en La Cura. Para completar tu registro y acceder a todas las funcionalidades, 
                                por favor verifica tu dirección de email haciendo clic en el botón de abajo.
                            </p>
                            
                            <!-- Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${verificationUrl}" 
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
                                ${verificationUrl}
                            </p>
                            
                            <p style="color: #999999; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                                Este enlace expirará en 24 horas. Si no solicitaste este registro, puedes ignorar este email.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 20px; text-align: center;">
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                © ${new Date().getFullYear()} La Cura. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

/**
 * Texto plano del email (fallback)
 */
export const getVerificationEmailText = (userName, verificationUrl) => {
    return `
Hola ${userName},

Gracias por registrarte en La Cura. Para completar tu registro, por favor verifica tu email visitando el siguiente enlace:

${verificationUrl}

Este enlace expirará en 24 horas.

Si no solicitaste este registro, puedes ignorar este email.

Saludos,
El equipo de La Cura
    `;
};

