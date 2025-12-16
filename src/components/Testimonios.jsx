const Testimonios = () => {
    return (
        <section id="testimonios" className="testimonios">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Lo que dicen los intrépidos</h2>
                    <p className="section-subtitle">
                        Personas que ya se atrevieron a ser auténticas
                    </p>
                </div>
                <div className="testimonios-grid">
                    <div className="testimonio-card">
                        <div className="testimonio-content">
                            <p>"La Cura me enseñó que ser auténtico no es debilidad, es la mayor fortaleza. Ahora vivo con una valentía que nunca pensé tener."</p>
                        </div>
                        <div className="testimonio-author">
                            <div className="author-avatar">🔥</div>
                            <div className="author-info">
                                <h4>María González</h4>
                                <span>Intrépida Auténtica</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonio-card">
                        <div className="testimonio-content">
                            <p>"Este viaje me llevó a explorar rincones de mi ser que nunca había visitado. La rebeldía del autodescubrimiento es liberadora."</p>
                        </div>
                        <div className="testimonio-author">
                            <div className="author-avatar">⚡</div>
                            <div className="author-info">
                                <h4>Diego Ruiz</h4>
                                <span>Explorador de Límites</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonio-card">
                        <div className="testimonio-content">
                            <p>"Como el botito, La Cura se adaptó exactamente a lo que necesitaba. Cada desafío fue una puerta hacia mi crecimiento personal."</p>
                        </div>
                        <div className="testimonio-author">
                            <div className="author-avatar">💎</div>
                            <div className="author-info">
                                <h4>Laura Martínez</h4>
                                <span>Transformada Auténtica</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonios;
