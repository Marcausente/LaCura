import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import Header from './Header';
import Footer from './Footer';
import './VerificarEmail.css';

const VerificarEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setStatus('error');
                setMessage('Token de verificación no encontrado.');
                return;
            }

            try {
                const response = await fetch(API_ENDPOINTS.verifyEmail, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage('¡Tu cuenta ha sido verificada exitosamente!');
                    
                    // Redirect to home after 3 seconds
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Error al verificar el correo electrónico.');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
                setMessage('Ha ocurrido un error. Por favor, intenta de nuevo más tarde.');
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <>
            <Header />
            <main className="verificar-email-page">
                <div className="verificar-container">
                    {status === 'verifying' && (
                        <div className="verificar-card verifying">
                            <div className="spinner"></div>
                            <h1>Verificando tu cuenta...</h1>
                            <p>Por favor espera un momento mientras verificamos tu correo electrónico.</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="verificar-card success">
                            <div className="success-icon">✓</div>
                            <h1>¡Verificación exitosa!</h1>
                            <p>{message}</p>
                            <p className="redirect-text">Serás redirigido automáticamente en unos segundos...</p>
                            <button onClick={handleGoHome} className="home-button">
                                Ir al inicio ahora
                            </button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="verificar-card error">
                            <div className="error-icon">✕</div>
                            <h1>Error de verificación</h1>
                            <p>{message}</p>
                            <div className="error-actions">
                                <button onClick={handleGoHome} className="home-button">
                                    Volver al inicio
                                </button>
                                {user && (
                                    <p className="help-text">
                                        Si necesitas un nuevo correo de verificación, ve a tu perfil.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default VerificarEmail;
