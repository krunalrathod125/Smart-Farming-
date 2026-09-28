import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>{t('footer.brand')}</h3>
          <p>{t('footer.brandDesc')}</p>
        </div>
        <div className="footer-links">
          <h4>{t('footer.quickLinks')}</h4>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/scanner">{t('nav.scanner')}</Link>
          <Link to="/solutions">{t('nav.solutions')}</Link>
          <Link to="/history">{t('nav.history')}</Link>
        </div>
        <div className="footer-links">
          <h4>{t('footer.resources')}</h4>
          <a href="#faq">{t('footer.faq')}</a>
          <a href="#privacy">{t('footer.privacy')}</a>
          <a href="#terms">{t('footer.terms')}</a>
          <a href="#contact">{t('footer.contact')}</a>
        </div>
        <div className="footer-newsletter">
          <h4>{t('footer.newsletter')}</h4>
          <p>{t('footer.newsletterDesc')}</p>
          <div className="newsletter-form">
            <input type="email" placeholder={t('login.email')} />
            <button>{t('footer.subscribe')}</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;
