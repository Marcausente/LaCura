import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Send verification email to user
 * POST /api/send-verification-email
 */
export async function sendVerificationEmail(req, res) {
  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId and email' 
      });
    }

    // Generate verification token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token expires in 24 hours

    // Store token in database
    const { error: dbError } = await supabase
      .from('email_verification')
      .insert({
        profile_id: userId,
        token: token,
        expires_at: expiresAt.toISOString()
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        error: 'Error storing verification token' 
      });
    }

    // Create verification URL
    const baseUrl = process.env.FRONTEND_URL || process.env.URL || 'http://localhost:5173';
    const verificationUrl = `${baseUrl}/verificar-email?token=${token}`;

    // Send verification email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Verifica tu cuenta de La Cura',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 10px;
                padding: 40px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .logo {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo h1 {
                color: #2d3748;
                font-size: 28px;
                margin: 0;
              }
              .content {
                margin-bottom: 30px;
              }
              .button {
                display: inline-block;
                padding: 14px 30px;
                background-color: #3182ce;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
              }
              .button:hover {
                background-color: #2c5282;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
                font-size: 14px;
                color: #718096;
                text-align: center;
              }
              .warning {
                background-color: #fff5f5;
                border-left: 4px solid #fc8181;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <h1>🌟 La Cura</h1>
              </div>
              
              <div class="content">
                <h2>¡Bienvenido a La Cura!</h2>
                <p>Gracias por registrarte en nuestra plataforma. Para completar tu registro y acceder a todos los beneficios, necesitamos verificar tu dirección de correo electrónico.</p>
                
                <p>Haz clic en el botón de abajo para verificar tu cuenta:</p>
                
                <div style="text-align: center;">
                  <a href="${verificationUrl}" class="button">Verificar mi cuenta</a>
                </div>
                
                <p>O copia y pega este enlace en tu navegador:</p>
                <p style="word-break: break-all; color: #3182ce;">${verificationUrl}</p>
                
                <div class="warning">
                  <strong>⚠️ Importante:</strong> Este enlace expirará en 24 horas por razones de seguridad.
                </div>
                
                <p>Si no creaste una cuenta en La Cura, puedes ignorar este correo electrónico.</p>
              </div>
              
              <div class="footer">
                <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
                <p>&copy; ${new Date().getFullYear()} La Cura. Todos los derechos reservados.</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        error: 'Error sending verification email' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Verification email sent successfully',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}

/**
 * Verify email with token
 * POST /api/verify-email or GET /api/verify-email?token=xxx
 */
export async function verifyEmail(req, res) {
  try {
    // Get token from query parameters or body
    const token = req.method === 'GET' 
      ? req.query.token 
      : req.body.token;

    if (!token) {
      return res.status(400).json({ 
        error: 'Missing verification token' 
      });
    }

    // Find the verification record
    const { data: verificationData, error: fetchError } = await supabase
      .from('email_verification')
      .select('*')
      .eq('token', token)
      .single();

    if (fetchError || !verificationData) {
      return res.status(404).json({ 
        error: 'Invalid or expired verification token' 
      });
    }

    // Check if token has expired
    const now = new Date();
    const expiresAt = new Date(verificationData.expires_at);
    
    if (now > expiresAt) {
      // Delete expired token
      await supabase
        .from('email_verification')
        .delete()
        .eq('token', token);

      return res.status(400).json({ 
        error: 'Verification token has expired' 
      });
    }

    // Update profile to mark as verified
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ verified: true })
      .eq('id', verificationData.profile_id);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      return res.status(500).json({ 
        error: 'Error verifying account' 
      });
    }

    // Delete the used token
    await supabase
      .from('email_verification')
      .delete()
      .eq('token', token);

    return res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully' 
    });

  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
