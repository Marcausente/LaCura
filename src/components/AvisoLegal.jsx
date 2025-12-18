import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Cookies.css';

const AvisoLegal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="legal-page">
        <section className="legal-header">
          <div className="container">
            <h1 className="legal-title">Aviso Legal</h1>
          </div>
        </section>

        <div className="container">
          <div className="legal-content">
            <div className="legal-text">
              <p>
                En cumplimiento con el deber de información recogido en la normativa vigente sobre servicios de la sociedad de la información y de comercio electrónico, a continuación se detallan los datos de información general de este sitio web.
              </p>

              <h3>1. Datos Identificativos</h3>
              <p>
                El titular de este sitio web es <strong>La Cura</strong>, con correo de contacto: <a href="mailto:info@lacura.com" className="legal-link">info@lacura.com</a>.
              </p>

              <h3>2. Propiedad Intelectual e Industrial</h3>
              <p>
                Todos los contenidos de este sitio web, incluyendo textos, imágenes, gráficos, logos, iconos, botones, software, códigos fuente, así como el diseño, estructura de navegación y la selección, ordenación y presentación de sus contenidos, están protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública y transformación sin autorización expresa.
              </p>

              <h3>3. Condiciones de Uso</h3>
              <p>
                El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las condiciones generales de uso aquí reflejadas.
              </p>
              <ul>
                <li>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios.</li>
                <li>No emplearlos para incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
                <li>No difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
              </ul>

              <h3>4. Exclusión de Garantías y Responsabilidad</h3>
              <p>
                <strong>La Cura</strong> no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
              </p>

              <h3>5. Modificaciones</h3>
              <p>
                <strong>La Cura</strong> se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
              </p>

              <h3>6. Ley Aplicable y Jurisdicción</h3>
              <p>
                La relación entre <strong>La Cura</strong> y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad correspondiente.
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

export default AvisoLegal;
