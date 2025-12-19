import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
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
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            let avatarUrl = null;

            if (avatarFile) {
                const fileExt = avatarFile.name.split('.').pop();
                const fileName = `${user.id}-${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, avatarFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(filePath);

                avatarUrl = publicUrl;
            }

            const profileData = {
                nombre: formData.nombre,
                apellidos: formData.apellidos,
                fechaNacimiento: formData.fechaNacimiento,
                ...(avatarUrl && { avatar_url: avatarUrl })
            };

            await updateProfile(profileData);
            navigate('/pago.html');
        } catch (err) {
            console.error(err);
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

                        <div className="profile-avatar-section">
                            <div 
                                className="avatar-preview" 
                                onClick={handleAvatarClick}
                                style={{ backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none' }}
                            >
                                {!avatarPreview && <span className="avatar-placeholder">📷</span>}
                                <div className="avatar-overlay">
                                    <span>Cambiar</span>
                                </div>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <p className="avatar-hint">Toca para añadir una foto (opcional)</p>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                value={user?.email || ''} 
                                disabled 
                                className="input-disabled"
                            />
                        </div>

                        <div className="form-row">
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
