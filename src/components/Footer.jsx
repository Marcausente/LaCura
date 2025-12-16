const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <div>
                            <img src="/IMG/Marca/La cura-09.png" alt="La Cura" className="footer-logo-img" />
                            <span>La Cura</span>
                        </div>
                        <p>Una travesía audaz hacia la autenticidad. Para los intrépidos que desafían el status quo.</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Curso</h4>
                            <ul>
                                <li><a href="/#curso">Contenido</a></li>
                                <li><a href="/#beneficios">Beneficios</a></li>
                                <li><a href="/#testimonios">Testimonios</a></li>
                                <li><a href="/#agoney">Sobre Agoney</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Soporte</h4>
                            <ul>
                                <li><a href="/#contacto">Contacto</a></li>
                                <li><a href="#">Preguntas Frecuentes</a></li>
                                <li><a href="#">Centro de Ayuda</a></li>
                                <li><a href="/blog.html">Blog</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Términos y Condiciones</a></li>
                                <li><a href="#">Política de Privacidad</a></li>
                                <li><a href="/cookies">Cookies</a></li>
                                <li><a href="#">Aviso Legal</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 La Cura. Todos los derechos reservados. Hecho con ❤️ para los intrépidos.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
