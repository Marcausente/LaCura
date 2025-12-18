import { useState } from 'react';

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.type === 'textarea' ? 'message' : e.target.type]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 3000);
        }, 1500);
    };

    return (
        <section id="contacto" className="contacto">
            <div className="container">
                <div className="contacto-content">
                    <div className="contacto-info">
                        <h2>¿Tienes alguna duda?</h2>
                        <p>Si tienes preguntas sobre el proyecto o necesitas más información, estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.</p>
                        <div className="contacto-methods">
                            <div className="contacto-method">
                                <div className="method-icon">📧</div>
                                <div className="method-info">
                                    <h4>Email</h4>
                                    <span>info@lacura.com</span>
                                </div>
                            </div>
                            <div className="contacto-method">
                                <div className="method-icon">📱</div>
                                <div className="method-info">
                                    <h4>WhatsApp</h4>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contacto-form">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Tu nombre" 
                                    required 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    placeholder="Tu email" 
                                    required 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    placeholder="Tu mensaje" 
                                    rows="4" 
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="cta-primary" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Enviando...' : (status === 'success' ? '¡Enviado!' : 'Enviar Mensaje')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacto;
