import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                onSuccess(); // Navigate to /pago.html (handled by parent)
                onClose();
            } else {
                if (password !== confirmPassword) {
                    throw new Error("Las contraseñas no coinciden.");
                }
                await register(email, password);
                setRegistrationSuccess(true);
                // Don't close modal immediately, show success message
                setTimeout(() => {
                    onClose();
                    navigate('/completar-perfil'); // Navigate to profile completion
                }, 3000);
            }
        } catch (err) {
            setError(err.message || 'Ha ocurrido un error. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>&times;</button>
                
                {registrationSuccess ? (
                    <div className="auth-success">
                        <div className="success-icon">✓</div>
                        <h2>¡Cuenta creada exitosamente!</h2>
                        <p>Hemos enviado un correo de verificación a <strong>{email}</strong></p>
                        <p>Por favor, revisa tu bandeja de entrada y verifica tu cuenta para acceder a todas las funciones.</p>
                        <div className="success-footer">
                            <p>Serás redirigido a completar tu perfil en unos segundos...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="auth-tabs">
                            <button 
                                className={`auth-tab ${isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                Iniciar Sesión
                            </button>
                            <button 
                                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                Registrarse
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && <div className="auth-error">{error}</div>}
                            
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>Contraseña</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="******"
                                    minLength={6}
                                />
                            </div>

                            {!isLogin && (
                                <div className="form-group fade-in">
                                    <label>Confirmar Contraseña</label>
                                    <input 
                                        type="password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="******"
                                        minLength={6}
                                    />
                                </div>
                            )}

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading 
                                    ? 'Procesando...' 
                                    : (isLogin ? 'Entrar' : 'Crear Cuenta')
                                }
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default AuthModal;
