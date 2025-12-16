import './Blog.css';
import Header from './Header';
import Footer from './Footer';

const Blog = () => {
    return (
        <>
            <Header />
            <main>
                <section className="blog-hero">
                    <div className="blog-hero-shapes">
                        <div className="blog-shape blog-shape-1"></div>
                        <div className="blog-shape blog-shape-2"></div>
                        <div className="blog-shape blog-shape-3"></div>
                    </div>
                    
                    <div className="blog-hero-grid"></div>
                    
                    <div className="blog-hero-decoration decoration-1">✨</div>
                    <div className="blog-hero-decoration decoration-2">💡</div>
                    <div className="blog-hero-decoration decoration-3">📝</div>
                    
                    <div className="blog-hero-content">
                        <span className="blog-hero-label">✍️ Inspiración y Conocimiento</span>
                        <h1>Blog de<br/><span className="blog-hero-highlight">La Cura</span></h1>
                        <p>Artículos, reflexiones y contenido para tu desarrollo personal y crecimiento auténtico. Descubre herramientas prácticas para transformar tu vida.</p>
                        
                        <div className="blog-hero-stats">
                            <div className="blog-stat">
                                <span className="blog-stat-number">50+</span>
                                <span className="blog-stat-label">Artículos</span>
                            </div>
                            <div className="blog-stat">
                                <span className="blog-stat-number">10K+</span>
                                <span className="blog-stat-label">Lectores</span>
                            </div>
                            <div className="blog-stat">
                                <span className="blog-stat-number">4</span>
                                <span className="blog-stat-label">Categorías</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="blog-section">
                    <div className="container">
                        <div className="blog-filters">
                            <button className="filter-btn active">Todos</button>
                            <button className="filter-btn">Desarrollo Personal</button>
                            <button className="filter-btn">Psicología</button>
                            <button className="filter-btn">Liderazgo</button>
                            <button className="filter-btn">Emprendimiento</button>
                        </div>

                        <div className="blog-grid">
                            <article className="blog-card">
                                <div className="blog-card-image">🔥</div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-category">Desarrollo Personal</span>
                                        <span>5 min de lectura</span>
                                    </div>
                                    <h3>La valentía de ser auténtico</h3>
                                    <p>Descubre por qué la autenticidad es el mayor acto de rebeldía en un mundo que te pide conformarte.</p>
                                    <div className="blog-card-footer">
                                        <span style={{color: 'var(--gray-600)', fontSize: '14px'}}>12 Oct 2025</span>
                                        <a href="#" className="blog-read-more">Leer más →</a>
                                    </div>
                                </div>
                            </article>

                            <article className="blog-card">
                                <div className="blog-card-image">💎</div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-category">Psicología</span>
                                        <span>7 min de lectura</span>
                                    </div>
                                    <h3>Rompiendo barreras internas</h3>
                                    <p>Cómo identificar y superar las limitaciones mentales que frenan tu crecimiento personal.</p>
                                    <div className="blog-card-footer">
                                        <span style={{color: 'var(--gray-600)', fontSize: '14px'}}>10 Oct 2025</span>
                                        <a href="#" className="blog-read-more">Leer más →</a>
                                    </div>
                                </div>
                            </article>

                            <article className="blog-card">
                                <div className="blog-card-image">🚀</div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-category">Liderazgo</span>
                                        <span>6 min de lectura</span>
                                    </div>
                                    <h3>Lidera con inteligencia emocional</h3>
                                    <p>Las claves para desarrollar un liderazgo auténtico y consciente que inspire a tu equipo.</p>
                                    <div className="blog-card-footer">
                                        <span style={{color: 'var(--gray-600)', fontSize: '14px'}}>8 Oct 2025</span>
                                        <a href="#" className="blog-read-more">Leer más →</a>
                                    </div>
                                </div>
                            </article>

                            <article className="blog-card">
                                <div className="blog-card-image">⚡</div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-category">Emprendimiento</span>
                                        <span>8 min de lectura</span>
                                    </div>
                                    <h3>El poder de la resiliencia empresarial</h3>
                                    <p>Estrategias probadas para mantener tu motivación y energía en momentos de adversidad.</p>
                                    <div className="blog-card-footer">
                                        <span style={{color: 'var(--gray-600)', fontSize: '14px'}}>5 Oct 2025</span>
                                        <a href="#" className="blog-read-more">Leer más →</a>
                                    </div>
                                </div>
                            </article>

                            <article className="blog-card">
                                <div className="blog-card-image">🌱</div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-category">Desarrollo Personal</span>
                                        <span>5 min de lectura</span>
                                    </div>
                                    <h3>El arte del crecimiento constante</h3>
                                    <p>Por qué el verdadero éxito no es un destino, sino un camino de evolución continua.</p>
                                    <div className="blog-card-footer">
                                        <span style={{color: 'var(--gray-600)', fontSize: '14px'}}>3 Oct 2025</span>
                                        <a href="#" className="blog-read-more">Leer más →</a>
                                    </div>
                                </div>
                            </article>

                            <article className="blog-card">
                                <div className="blog-card-image">🎯</div>
                                <div className="blog-card-content">
                                    <div className="blog-card-meta">
                                        <span className="blog-card-category">Psicología</span>
                                        <span>6 min de lectura</span>
                                    </div>
                                    <h3>Transformando el miedo en acción</h3>
                                    <p>Técnicas prácticas para convertir tus miedos en el combustible de tu transformación.</p>
                                    <div className="blog-card-footer">
                                        <span style={{color: 'var(--gray-600)', fontSize: '14px'}}>1 Oct 2025</span>
                                        <a href="#" className="blog-read-more">Leer más →</a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Blog;
