import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Navbar() {
  const { t, language, changeLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextLang = { en: 'hi', hi: 'gu', gu: 'en' };
  const langLabel = { en: 'EN', hi: 'हि', gu: 'ગુ' };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Link to="/" className="logo">
        <span className="logo-icon">🌿</span> {t('nav.brand')}
      </Link>

      <button
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span></span><span></span><span></span>
      </button>

      <nav className={menuOpen ? 'nav-open' : ''}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>{t('nav.home')}</NavLink>
        <NavLink to="/scanner" onClick={() => setMenuOpen(false)}>{t('nav.scanner')}</NavLink>
        <NavLink to="/solutions" onClick={() => setMenuOpen(false)}>{t('nav.solutions')}</NavLink>
        <NavLink to="/history" onClick={() => setMenuOpen(false)}>{t('nav.history')}</NavLink>
        <button className="lang-toggle" onClick={() => changeLanguage(nextLang[language])}>
          {langLabel[language]}
        </button>
        <button className="login-btn" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
          {t('nav.portalLogin')}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
