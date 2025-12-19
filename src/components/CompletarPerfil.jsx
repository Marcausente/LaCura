import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import './CompletarPerfil.css';

const CompletarPerfil = () => {
    const { user, updateProfile, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        fechaNacimiento: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await updateProfile({
                nombre: formData.nombre,
                apellidos: formData.apellidos,
                fechaNacimiento: formData.fechaNacimiento
            });
            navigate('/pago.html');
        } catch (err) {
            setError(err.message || 'Error al actualizar el perfil.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <>
            <Header />
            <main className="profile-completion-page">
                <div className="profile-completion-card">
                    <div className="profile-header">
                        <h2>¡Casi estamos! 🚀</h2>
                        <p>Completa tu perfil para continuar con el viaje</p>
                    </div>

                    <form onSubmit={handleSubmit} className="profile-form">
                        {error && <div className="auth-error">{error}</div>}

                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                value={user?.email || ''} 
                                disabled 
                            />
                        </div>

                        <div className="form-group">
                            <label>Nombre</label>
                            <input 
                                type="text" 
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                required
                                placeholder="Tu nombre"
                            />
                        </div>

                        <div className="form-group">
                            <label>Apellidos</label>
                            <input 
                                type="text" 
                                value={formData.apellidos}
                                onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                                required
                                placeholder="Tus apellidos"
                            />
                        </div>

                        <div className="form-group">
                            <label>Fecha de Nacimiento</label>
                            <input 
                                type="date" 
                                value={formData.fechaNacimiento}
                                onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-profile-btn" disabled={submitting}>
                            {submitting ? 'Guardando...' : 'Continuar al Pago →'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CompletarPerfil;
