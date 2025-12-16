import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Cookies.css';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-header">
          <div className="container">
            <h1 className="legal-title">Política de Cookies</h1>
          </div>
        </section>

        <div className="container">
          <div className="legal-content">
            <div className="legal-text">
              <p>
                En <strong>La Cura</strong>, valoramos tu privacidad y queremos ser transparentes sobre cómo utilizamos las tecnologías para mejorar tu experiencia en nuestro sitio web. Esta política explica qué son las cookies, cómo las usamos y tus opciones para controlarlas.
              </p>

              <h3>¿Qué son las cookies?</h3>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, tablet o móvil) cuando los visitas. Son ampliamente utilizadas para que los sitios web funcionen de manera más eficiente, así como para proporcionar información analítica a los propietarios del sitio. No dañan tu dispositivo y nos ayudan a ofrecerte una mejor experiencia de usuario.
              </p>

              <h3>¿Cómo utilizamos las cookies?</h3>
              <p>
                Utilizamos cookies de primera parte y de terceros por varias razones técnicas. Algunas cookies son necesarias por razones técnicas para que nuestro sitio web funcione, y nos referimos a ellas como cookies "esenciales". Otras cookies también nos permiten rastrear y dirigir los intereses de nuestros usuarios para mejorar la experiencia en nuestras propiedades en línea.
              </p>
              <p>Específicamente, utilizamos cookies para:</p>
              <ul>
                <li><strong>Esenciales:</strong> Permitir la navegación y el acceso a áreas seguras del sitio.</li>
                <li><strong>Preferencias:</strong> Recordar tus configuraciones y preferencias (como idioma o región).</li>
                <li><strong>Analíticas:</strong> Analizar el tráfico y el comportamiento de los usuarios en el sitio para mejorar su rendimiento y contenido.</li>
                <li><strong>Marketing:</strong> Mostrar anuncios relevantes (si aplica en el futuro).</li>
              </ul>

              <h3>Control de cookies</h3>
              <p>
                Tienes el derecho a decidir si aceptas o rechazas las cookies. Puedes configurar o modificar los controles de tu navegador web para aceptar o rechazar cookies. Si eliges rechazar las cookies, puedes seguir utilizando nuestro sitio web, aunque tu acceso a algunas funcionalidades y áreas de nuestro sitio web puede estar restringido.
              </p>
              <p>
                Para más detalles sobre cómo controlar las cookies, visita la configuración de tu navegador (Chrome, Firefox, Safari, Edge, etc.).
              </p>

              <h3>Más información</h3>
              <p>
                Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en <Link to="/#contacto" className="legal-link">contactarnos</Link>.
              </p>
            </div>

            <div className="legal-action">
              <Link to="/" className="btn-back">
                <span>← Volver al Inicio</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cookies;
