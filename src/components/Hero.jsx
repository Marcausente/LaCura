import { useEffect, useRef } from 'react';

const Hero = () => {
    return (
        <section id="inicio" className="hero">
            <div className="hero-shapes">
                <div className="shape-blob shape-blob-1"></div>
                <div className="shape-blob shape-blob-2"></div>
                <div className="shape-blob shape-blob-3"></div>
            </div>
            <div className="hero-grid-pattern"></div>
            <div className="hero-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>
            <div className="hero-rays"></div>
            
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-label-wrapper">
                        <span className="hero-label">✨ Transforma tu vida</span>
                    </div>
                    <h1 className="hero-title">
                        La Cura para tu<br/>
                        <span className="hero-highlight">Desarrollo Personal</span>
                    </h1>
                    <p className="hero-description">
                        Descubre el programa que te ayudará a conectar con tu esencia auténtica, 
                        superar tus límites y transformar tu vida desde dentro.
                    </p>
                    <div className="hero-benefits">
                        <div className="benefit">
                            <div className="benefit-icon">✓</div>
                            <span>Acceso inmediato</span>
                        </div>
                        <div className="benefit">
                            <div className="benefit-icon">✓</div>
                            <span>Contenido práctico</span>
                        </div>
                        <div className="benefit">
                            <div className="benefit-icon">✓</div>
                            <span>Resultados reales</span>
                        </div>
                    </div>
                    <div className="hero-actions">
                        <a href="#cta" className="btn-hero-primary">Comenzar Mi Transformación</a>
                        <p className="hero-guarantee">🔒 Garantía de satisfacción 30 días</p>
                    </div>
                    <div className="hero-social-proof">
                        <div className="social-avatars">
                            <div className="avatar">👤</div>
                            <div className="avatar">👤</div>
                            <div className="avatar">👤</div>
                            <div className="avatar-more">+1K</div>
                        </div>
                        <p className="social-text">Más de <strong>1,000 personas</strong> transformando su vida</p>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <div className="floating-badge badge-1">
                            <span className="badge-emoji">⚡</span>
                            <span className="badge-text">Transforma</span>
                        </div>
                        <div className="floating-badge badge-2">
                            <span className="badge-emoji">💎</span>
                            <span className="badge-text">Crece</span>
                        </div>
                        <div className="floating-badge badge-3">
                            <span className="badge-emoji">🚀</span>
                            <span className="badge-text">Evoluciona</span>
                        </div>
                        <div className="hero-image-glow"></div>
                        <img src="/IMG/Marca/mockups-15.jpg" alt="Curso La Cura" className="hero-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
