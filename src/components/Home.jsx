import { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Curso from './Curso';
import Beneficios from './Beneficios';
import Agoney from './Agoney';
import Testimonios from './Testimonios';
import CTA from './CTA';
import Contacto from './Contacto';
import Footer from './Footer';

const Home = () => {
  // Porting the scroll reveal logic from script.js
  useEffect(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.curso-card, .beneficio-item, .testimonio-card, .section-header, .agoney-image-container, .agoney-info');
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax effect
  useEffect(() => {
    let parallaxTicking = false;
    const heroImage = document.querySelector('.hero-image');
    const floatingCards = document.querySelectorAll('.floating-card');

    const isMobile = window.innerWidth <= 768;

    if (!isMobile && (heroImage || floatingCards.length > 0)) {
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            if (scrolled < window.innerHeight) {
                if (heroImage) {
                    heroImage.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
                }
            }
            parallaxTicking = false;
        }

        const onScroll = () => {
           if (!parallaxTicking) {
              window.requestAnimationFrame(updateParallax);
              parallaxTicking = true;
          }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }
}, []);

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Curso />
                <Beneficios />
                <Agoney />
                <Testimonios />
                <CTA />
                <Contacto />
            </main>
            <Footer />
        </>
    );
};

export default Home;
