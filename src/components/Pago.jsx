import { useState } from 'react';
import './Pago.css';
import Header from './Header';
import Footer from './Footer';

const Pago = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: ''
    });

    const handleCardInput = (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        setFormData({ ...formData, cardNumber: formattedValue });
    };

    const handleExpiryInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setFormData({ ...formData, expiry: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            alert('¡Pago procesado correctamente! Gracias por unirte a La Cura. Te hemos enviado un email con los detalles de acceso.');
            window.location.href = '/';
        }, 2000);
    };

    return (
        <>
            <Header />
            <main className="payment-page">
                <div className="payment-container">
                    <div className="payment-info">
                        <div className="breadcrumb">
                            <a href="/">Inicio</a>
                            <span>→</span>
                            <span>Pago</span>
                        </div>

                        <h2>Completa tu Transformación</h2>

                        <form id="payment-form" onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h3>📋 Información Personal</h3>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Nombre</label>
                                        <input type="text" placeholder="Juan" required />
                                    </div>
                                    <div className="input-group">
                                        <label>Apellidos</label>
                                        <input type="text" placeholder="García" required />
                                    </div>
                                </div>
                                <div className="form-row full">
                                    <div className="input-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="tu@email.com" required />
                                    </div>
                                </div>
                                <div className="form-row full">
                                    <div className="input-group">
                                        <label>Teléfono</label>
                                        <input type="tel" placeholder="+34 600 000 000" required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>💳 Método de Pago</h3>
                                <div className="payment-methods">
                                    <div 
                                        className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <div className="payment-method-icon">💳</div>
                                        <div className="payment-method-name">Tarjeta</div>
                                    </div>
                                    <div 
                                        className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('paypal')}
                                    >
                                        <div className="payment-method-icon">🅿️</div>
                                        <div className="payment-method-name">PayPal</div>
                                    </div>
                                    <div 
                                        className={`payment-method ${paymentMethod === 'transfer' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('transfer')}
                                    >
                                        <div className="payment-method-icon">🏦</div>
                                        <div className="payment-method-name">Transferencia</div>
                                    </div>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div id="card-details">
                                        <div className="form-row full">
                                            <div className="input-group">
                                                <label>Número de Tarjeta</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="1234 5678 9012 3456" 
                                                    maxLength="19" 
                                                    required 
                                                    value={formData.cardNumber}
                                                    onChange={handleCardInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row full">
                                            <div className="input-group">
                                                <label>Titular de la Tarjeta</label>
                                                <input type="text" placeholder="Nombre como aparece en la tarjeta" required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="input-group">
                                                <label>Fecha de Expiración</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="MM/AA" 
                                                    maxLength="5" 
                                                    required 
                                                    value={formData.expiry}
                                                    onChange={handleExpiryInput}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>CVV</label>
                                                <input type="text" placeholder="123" maxLength="3" required />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-section">
                                <h3>📍 Dirección de Facturación</h3>
                                <div className="form-row full">
                                    <div className="input-group">
                                        <label>Dirección</label>
                                        <input type="text" placeholder="Calle, número, piso" required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Ciudad</label>
                                        <input type="text" placeholder="Madrid" required />
                                    </div>
                                    <div className="input-group">
                                        <label>Código Postal</label>
                                        <input type="text" placeholder="28001" required />
                                    </div>
                                </div>
                                <div className="form-row full">
                                    <div className="input-group">
                                        <label>País</label>
                                        <select required defaultValue="">
                                            <option value="" disabled>Selecciona un país</option>
                                            <option value="ES">España</option>
                                            <option value="MX">México</option>
                                            <option value="AR">Argentina</option>
                                            <option value="CO">Colombia</option>
                                            <option value="CL">Chile</option>
                                            <option value="PE">Perú</option>
                                            <option value="VE">Venezuela</option>
                                            <option value="EC">Ecuador</option>
                                            <option value="BO">Bolivia</option>
                                            <option value="UY">Uruguay</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-payment" disabled={processing}>
                                {processing ? 'Procesando pago...' : 'Completar Pago Seguro 🔒'}
                            </button>

                            <div className="security-badges">
                                <div className="security-badge">
                                    <span>🔒</span>
                                    <span>Pago Seguro SSL</span>
                                </div>
                                <div className="security-badge">
                                    <span>✓</span>
                                    <span>Verificado</span>
                                </div>
                                <div className="security-badge">
                                    <span>💳</span>
                                    <span>PCI-DSS</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="order-summary">
                        <h3>Resumen del Pedido</h3>

                        <div className="product-item">
                            <div className="product-image">💎</div>
                            <div className="product-details">
                                <h4>Curso La Cura - Completo</h4>
                                <p>Acceso completo y de por vida</p>
                                <p>✓ Todos los módulos</p>
                                <p>✓ Material descargable</p>
                                <p>✓ Soporte 24/7</p>
                                <div className="product-price">397€</div>
                            </div>
                        </div>

                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Subtotal</span>
                                <span>397€</span>
                            </div>
                            <div className="price-row discount">
                                <span>Descuento especial</span>
                                <span>-50€</span>
                            </div>
                            <div className="price-row">
                                <span>IVA (21%)</span>
                                <span>72.87€</span>
                            </div>
                            <div className="price-row total">
                                <span>Total</span>
                                <span>419.87€</span>
                            </div>
                        </div>

                        <div className="guarantee-badge">
                            <div className="guarantee-icon">🛡️</div>
                            <div className="guarantee-text">
                                <strong>Garantía de 30 días</strong>
                                Si no estás satisfecho, te devolvemos el 100% de tu dinero. Sin preguntas.
                            </div>
                        </div>

                        <div style={{marginTop: '24px', padding: '16px', background: 'rgba(231, 78, 111, 0.05)', borderRadius: 'var(--border-radius)', textAlign: 'center'}}>
                            <p style={{fontSize: '14px', color: 'var(--gray-700)', margin: '0'}}>
                                🔥 <strong>+1,000 personas</strong> ya han comenzado su transformación
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Pago;
