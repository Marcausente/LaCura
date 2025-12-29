import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import Header from './Header';
import Footer from './Footer';
import './VerificacionPendiente.css';

const VerificacionPendiente = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [resending, setResending] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        // Get user email
        setEmail(user.email);

        // Check if user is already verified
        const checkVerification = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('verified')
                .eq('id', user.id)
                .single();

            if (data && data.verified) {
                navigate('/completar-perfil');
            }
        };

        checkVerification();
    }, [user, navigate]);

    const handleResendVerification = async () => {
        setResending(true);
        setMessage('');
        
        try {
            const { data, error } = await supabase
                .rpc('resend_verification_token', { user_id: user.id });

            if (error) throw error;

            if (data.success) {
                setMessage('✓ Se ha reenviado el email de verificación. Revisa tu bandeja de entrada.');
            } else {
                setMessage('⚠ ' + data.message);
            }
        } catch (err) {
            console.error('Error resending verification:', err);
            setMessage('✗ Error al reenviar el email de verificación. Intenta de nuevo.');
        } finally {
            setResending(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <>
            <Header />
            <main className="pending-verification-page">
                <div className="pending-verification-card">
                    <div className="mail-icon">📧</div>
                    <h2>Verifica tu email</h2>
                    <p className="main-text">
                        Hemos enviado un email de verificación a:
                    </p>
                    <p className="email-display">{email}</p>
                    
                    <div className="instructions">
                        <p>Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación.</p>
                        <p className="small-text">Si no encuentras el email, revisa tu carpeta de spam.</p>
                    </div>

                    {message && (
                        <div className={`message ${message.includes('✓') ? 'success' : message.includes('✗') ? 'error' : 'info'}`}>
                            {message}
                        </div>
                    )}

                    <div className="actions">
                        <button 
                            onClick={handleResendVerification} 
                            className="resend-btn"
                            disabled={resending}
                        >
                            {resending ? 'Reenviando...' : 'Reenviar email de verificación'}
                        </button>
                        
                        <button 
                            onClick={handleLogout} 
                            className="logout-btn"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default VerificacionPendiente;

