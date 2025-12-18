import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Cookies.css';

const PoliticaPrivacidad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-header">
          <div className="container">
            <h1 className="legal-title">Política de Privacidad</h1>
          </div>
        </section>

        <div className="container">
          <div className="legal-content">
            <div className="legal-text">
              <p>
                En <strong>La Cura</strong>, nos tomamos muy en serio la privacidad de tus datos. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web. Al utilizar nuestros servicios, aceptas las prácticas descritas en este documento.
              </p>

              <h3>1. Información que recopilamos</h3>
              <p>
                Podemos recopilar información personal que tú nos proporcionas voluntariamente, como:
              </p>
              <ul>
                <li><strong>Datos de contacto:</strong> Nombre, dirección de correo electrónico, número de teléfono.</li>
                <li><strong>Información de consultas:</strong> Detalles sobre tus dudas o mensajes enviados a través de nuestros formularios.</li>
                <li><strong>Datos técnicos:</strong> Dirección IP, tipo de navegador y datos de navegación (a través de cookies).</li>
              </ul>

              <h3>2. Cómo utilizamos tu información</h3>
              <p>
                Utilizamos la información recopilada para los siguientes fines:
              </p>
              <ul>
                <li>Responder a tus consultas y proporcionarte la información solicitada.</li>
                <li>Mejorar nuestros servicios y la experiencia de usuario en el sitio web.</li>
                <li>Enviar comunicaciones relacionadas con el proyecto (si has aceptado recibirlas).</li>
                <li>Cumplir con obligaciones legales y regulatorias.</li>
              </ul>

              <h3>3. Protección de datos</h3>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción. Sin embargo, ten en cuenta que ninguna transmisión por Internet es 100% segura.
              </p>

              <h3>4. Tus derechos</h3>
              <p>
                Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. También puedes oponerte al tratamiento de tus datos o solicitar su limitación. Para ejercer estos derechos, por favor contáctanos.
              </p>

              <h3>5. Contacto</h3>
              <p>
                Si tienes preguntas sobre nuestra política de privacidad o el tratamiento de tus datos, puedes contactarnos a través de nuestra sección de <Link to="/#contacto" className="legal-link">contacto</Link>.
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

export default PoliticaPrivacidad;
