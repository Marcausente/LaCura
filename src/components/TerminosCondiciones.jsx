import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Cookies.css';

const TerminosCondiciones = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-header">
          <div className="container">
            <h1 className="legal-title">Términos y Condiciones</h1>
          </div>
        </section>

        <div className="container">
          <div className="legal-content">
            <div className="legal-text">
              <p>
                Bienvenido a <strong>La Cura</strong>. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, te recomendamos que no utilices nuestro sitio.
              </p>

              <h3>1. Uso del Sitio</h3>
              <p>
                Este sitio web y sus contenidos están destinados a proporcionar información sobre nuestros servicios y proyectos. Queda prohibido el uso del sitio con fines ilegales o no autorizados.
              </p>

              <h3>2. Propiedad Intelectual</h3>
              <p>
                Todo el contenido presente en este sitio (textos, gráficos, logotipos, imágenes, clips de audio, descargas digitales y compilaciones de datos) es propiedad de <strong>La Cura</strong> o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
              </p>

              <h3>3. Enlaces a Terceros</h3>
              <p>
                Nuestro sitio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por <strong>La Cura</strong>. No tenemos control sobre, ni asumimos responsabilidad por, el contenido, las políticas de privacidad o las prácticas de sitios web de terceros.
              </p>

              <h3>4. Limitación de Responsabilidad</h3>
              <p>
                En ningún caso <strong>La Cura</strong>, ni sus directores, empleados o agentes, serán responsables por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de uso de este sitio.
              </p>

              <h3>5. Modificaciones de los Términos</h3>
              <p>
                Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de los cambios.
              </p>

              <h3>6. Ley Aplicable</h3>
              <p>
                Estos términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus conflictos de disposiciones legales.
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

export default TerminosCondiciones;
