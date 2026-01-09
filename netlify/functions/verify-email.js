import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  // Allow both GET and POST for flexibility
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get token from query parameters or body
    const token = event.httpMethod === 'GET' 
      ? event.queryStringParameters?.token 
      : JSON.parse(event.body || '{}').token;

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing verification token' })
      };
    }

    // Find the verification record
    const { data: verificationData, error: fetchError } = await supabase
      .from('email_verification')
      .select('*')
      .eq('token', token)
      .single();

    if (fetchError || !verificationData) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Invalid or expired verification token' })
      };
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

      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Verification token has expired' })
      };
    }

    // Update profile to mark as verified
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ verified: true })
      .eq('id', verificationData.profile_id);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error verifying account' })
      };
    }

    // Delete the used token
    await supabase
      .from('email_verification')
      .delete()
      .eq('token', token);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email verified successfully' 
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
}
