import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, register } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                if (password !== confirmPassword) {
                    throw new Error("Las contraseñas no coinciden.");
                }
                await register(email, password);
            }
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || 'Ha ocurrido un error. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>&times;</button>
                
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
            </div>
        </div>
    );
};

export default AuthModal;
