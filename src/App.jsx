import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home';
import Blog from './components/Blog';
import Pago from './components/Pago';
import Cookies from './components/Cookies';
import Legal from './components/AvisoLegal';
import Terminos from './components/TerminosCondiciones';

import PoliticaPrivacidad from './components/PoliticaPrivacidad';

// Component to handle scroll to top on route change or hash scroll
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog.html" element={<Blog />} />
        <Route path="/pago.html" element={<Pago />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/aviso-legal" element={<Legal />} />
        <Route path="/terminos-condiciones" element={<Terminos />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        {/* Redirect legacy URLs or just handle them as routes like above */}
      </Routes>
    </Router>
  );
}

export default App;
