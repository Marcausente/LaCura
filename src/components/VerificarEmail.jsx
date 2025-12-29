import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import './VerificarEmail.css';

const VerificarEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('');
    const [resending, setResending] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setStatus('error');
                setMessage('Token de verificación no encontrado');
                return;
            }

            try {
                const { data, error } = await supabase
                    .rpc('verify_email_token', { verification_token: token });

                if (error) throw error;

                if (data.success) {
                    setStatus('success');
                    setMessage(data.message);
                    // Redirect to profile completion after 3 seconds
                    setTimeout(() => {
                        navigate('/completar-perfil');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message);
                }
            } catch (err) {
                console.error('Error verifying email:', err);
                setStatus('error');
                setMessage('Error al verificar el email. Por favor, intenta de nuevo.');
            }
        };

        verifyToken();
    }, [token, navigate]);

    const handleResendVerification = async () => {
        if (!user) {
            setMessage('Debes iniciar sesión para reenviar el email de verificación');
            return;
        }

        setResending(true);
        try {
            const { data, error } = await supabase
                .rpc('resend_verification_token', { user_id: user.id });

            if (error) throw error;

            if (data.success) {
                // In production, this would trigger an email
                // For now, we'll show the token (remove this in production)
                setMessage(`Se ha generado un nuevo token de verificación. Revisa tu email.`);
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            console.error('Error resending verification:', err);
            setMessage('Error al reenviar el email de verificación.');
        } finally {
            setResending(false);
        }
    };

    return (
        <>
            <Header />
            <main className="verification-page">
                <div className="verification-card">
                    {status === 'loading' && (
                        <div className="verification-loading">
                            <div className="spinner"></div>
                            <h2>Verificando tu email...</h2>
                            <p>Por favor espera un momento</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="verification-success">
                            <div className="success-icon">✓</div>
                            <h2>¡Email verificado con éxito!</h2>
                            <p>{message}</p>
                            <p className="redirect-text">Redirigiendo a completar perfil...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="verification-error">
                            <div className="error-icon">✗</div>
                            <h2>Error en la verificación</h2>
                            <p>{message}</p>
                            {user && (
                                <button 
                                    onClick={handleResendVerification} 
                                    className="resend-btn"
                                    disabled={resending}
                                >
                                    {resending ? 'Reenviando...' : 'Reenviar email de verificación'}
                                </button>
                            )}
                            <button 
                                onClick={() => navigate('/')} 
                                className="home-btn"
                            >
                                Volver al inicio
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default VerificarEmail;

