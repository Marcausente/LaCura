import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const CTA = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleStartJourney = (e) => {
        e.preventDefault();
        if (user) {
            navigate('/pago.html');
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <section id="cta" className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <h2>¿Listo para aceptar el desafío?</h2>
                    <p>Únete a miles de intrépidos que ya se atrevieron a ser auténticos y desafiar sus límites</p>
                    <div className="cta-actions">
                        <button onClick={handleStartJourney} className="cta-primary large">Empezar el Viaje</button>
                        <div className="cta-guarantee">
                            <span>🔥</span>
                            <span>Para los valientes</span>
                        </div>
                    </div>
                </div>
            </div>
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => navigate('/pago.html')}
            />
        </section>
    );
};

export default CTA;
