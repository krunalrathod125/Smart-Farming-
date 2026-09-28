import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function Hero() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">{t('hero.badge')}</div>
          <h1>
            {t('hero.title', t('hero.titleHighlight'))}
          </h1>
          <p>{t('hero.subtitle')}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/scanner')}>
              {t('hero.launchScanner')}
            </button>
            <button className="btn-secondary" onClick={() => navigate('/solutions')}>
              {t('hero.exploreSolutions')}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="status-dot"></span>
              <span>{t('hero.liveDetection')}</span>
            </div>
            <div className="hero-card-body">
              <div className="scan-animation">
                <div className="scan-ring"></div>
                <div className="scan-ring ring-2"></div>
                <div className="scan-ring ring-3"></div>
                <span className="scan-icon">🌱</span>
              </div>
              <div className="hero-card-result">
                <p className="result-label">{t('hero.detected')}</p>
                <p className="result-value">Leaf Blight</p>
                <div className="result-bar">
                  <div className="result-fill" style={{ width: '94%' }}></div>
                </div>
                <p className="result-conf">94% {t('hero.confidence')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
