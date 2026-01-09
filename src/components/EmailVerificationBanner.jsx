import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { API_ENDPOINTS } from '../config/api';
import './EmailVerificationBanner.css';

const EmailVerificationBanner = () => {
    const { user } = useAuth();
    const [isVerified, setIsVerified] = useState(true);
    const [loading, setLoading] = useState(true);
    const [resending, setResending] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkVerificationStatus = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // Get profile data to check verification status
                const { data, error } = await supabase
                    .from('profiles')
                    .select('verified')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    console.error('Error checking verification:', error);
                } else {
                    setIsVerified(data?.verified || false);
                }
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        checkVerificationStatus();
    }, [user]);

    const handleResendEmail = async () => {
        if (!user) return;
        
        setResending(true);
        setMessage('');

        try {
            const response = await fetch(API_ENDPOINTS.sendVerificationEmail, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    email: user.email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Correo de verificación enviado. Revisa tu bandeja de entrada.');
            } else {
                setMessage('❌ Error al enviar el correo. Inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error resending email:', error);
            setMessage('❌ Error al enviar el correo. Inténtalo de nuevo más tarde.');
        } finally {
            setResending(false);
        }
    };

    // Don't show banner if user is verified or not logged in
    if (loading || !user || isVerified) {
        return null;
    }

    return (
        <div className="email-verification-banner">
            <div className="banner-content">
                <div className="banner-icon">⚠️</div>
                <div className="banner-text">
                    <strong>Verifica tu cuenta</strong>
                    <p>Por favor, verifica tu correo electrónico para acceder a todas las funciones. Revisa tu bandeja de entrada.</p>
                </div>
                <button 
                    className="resend-button"
                    onClick={handleResendEmail}
                    disabled={resending}
                >
                    {resending ? 'Enviando...' : 'Reenviar correo'}
                </button>
            </div>
            {message && (
                <div className={`banner-message ${message.includes('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default EmailVerificationBanner;
