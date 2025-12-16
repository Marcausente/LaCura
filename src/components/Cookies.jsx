import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cookies = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Política de Cookies</h1>
      
      <div className="content" style={{ marginTop: '30px', lineHeight: '1.6' }}>
        <p>
          En La Cura, valoramos tu privacidad y queremos ser transparentes sobre cómo utilizamos las tecnologías para mejorar tu experiencia en nuestro sitio web.
        </p>

        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>¿Qué son las cookies?</h3>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, tablet o móvil) cuando los visitas. Son ampliamente utilizadas para que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
        </p>

        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>¿Cómo utilizamos las cookies?</h3>
        <p>
          Utilizamos cookies para entender cómo interactúas con nuestro sitio web, personalizar tu experiencia y mejorar nuestros servicios. Específicamente, utilizamos cookies para:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
          <li>Recordar tus preferencias y configuraciones.</li>
          <li>Analizar el tráfico y el comportamiento de los usuarios en el sitio para mejorar su rendimiento.</li>
          <li>Facilitar la navegación y el acceso a áreas seguras del sitio.</li>
        </ul>

        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Control de cookies</h3>
        <p>
          Puedes controlar y/o eliminar las cookies según desees. Puedes borrar todas las cookies que ya están en tu ordenador y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
        </p>

        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Más información</h3>
        <p>
          Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en <Link to="/#contacto" style={{ color: 'inherit', textDecoration: 'underline' }}>contactarnos</Link>.
        </p>
      </div>

      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '30px', background: 'var(--primary-color, #333)', color: '#fff', textDecoration: 'none' }}>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default Cookies;
