import { useState } from 'react';

const Agoney = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const accordionItems = [
        {
            icon: "🎯",
            title: "Formación Integral",
            content: "Desarrollo de programas formativos para sector privado e instituciones públicas, llevando la formación a todos los niveles y sectores. Mi metodología combina dinamismo, inteligencia emocional y un enfoque estratégico, ayudando a equipos a crecer en cohesión y alcanzar sus objetivos."
        },
        {
            icon: "🚀",
            title: "Proyecto Supernova",
            content: "Evento de alto impacto promovido por las Administraciones públicas, que ha contado con ponentes referentes como José Elías Navarro, Andoni Talledo e Inés Torremocha, entre otros. Una experiencia transformadora que inspira y empodera a la comunidad."
        },
        {
            icon: "🎓",
            title: "Experiencia en Formación",
            content: "Mi papel como formador se extiende a diferentes ámbitos: desde técnicas de ventas y liderazgo, hasta competencias emocionales, gestión del cambio y comunicación. Más de 12 años transformando equipos y organizaciones."
        },
        {
            icon: "🌟",
            title: "Iniciativas Innovadoras",
            content: "Creador de experiencias únicas como ModaKids Fest (una feria que une moda, comercio local y dinamización del talento impulsada por el Cabildo de Tenerife) y la Escuela de Jóvenes Influencers, desarrollando el potencial local."
        }
    ];

    return (
        <section id="agoney" className="agoney">
            <div className="container">
                <div className="agoney-content">
                    <div className="agoney-image-container scroll-reveal">
                        <img src="/IMG/Marca/AGONEY-MELIAN-FOTO-CEDIDA.jpeg" alt="Agoney Melián" className="agoney-image" />
                    </div>
                    <div className="agoney-info scroll-reveal">
                        <div className="agoney-header">
                            <h2 className="agoney-title">Agoney Melián</h2>
                            <div className="agoney-subtitle">CEO de Valtia Formación y UEBOS Comunicación</div>
                        </div>
                        <p className="agoney-description">
                            Apasionado del desarrollo personal, la formación y la comunicación, con más de 12 años de experiencia 
                            acompañando a personas y organizaciones en sus procesos de transformación.
                        </p>
                        <div className="agoney-accordion">
                            {accordionItems.map((item, index) => (
                                <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                                    <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                                        <div className="accordion-header-content">
                                            <span className="accordion-icon">{item.icon}</span>
                                            <h3 className="accordion-title">{item.title}</h3>
                                        </div>
                                        <span className="accordion-toggle">▼</span>
                                    </button>
                                    <div className="accordion-body">
                                        <p className="accordion-content">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Agoney;
