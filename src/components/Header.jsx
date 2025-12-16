import { useState, useEffect } from 'react';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
             // Logic for handling scroll states if needed, though CSS handles sticky/fixed mostly
             // Original script had logic to hide header on scroll down and show on scroll up
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-container">
                    <div className="logo">
                        <img src="/IMG/Marca/La cura-08.png" alt="La Cura Logo" className="logo-img" />
                        <span className="logo-text">La Cura</span>
                    </div>
                    <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
                        <li><a href="/#inicio" className="nav-link">Inicio</a></li>
                        <li><a href="/#curso" className="nav-link">El Curso</a></li>
                        <li><a href="/#beneficios" className="nav-link">Beneficios</a></li>
                        <li><a href="/#agoney" className="nav-link">Agoney</a></li>
                        <li><a href="/#testimonios" className="nav-link">Testimonios</a></li>
                        <li><a href="/#contacto" className="nav-link">Contacto</a></li>
                        <li><a href="/blog.html" className="nav-link">Blog</a></li>
                    </ul>
                    <button 
                        className={`nav-toggle ${isNavOpen ? 'active' : ''}`} 
                        id="nav-toggle"
                        onClick={toggleNav}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
