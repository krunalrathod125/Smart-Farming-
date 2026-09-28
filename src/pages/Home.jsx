import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const features = [
  { icon: '🔍', titleKey: 'features.instantDetection.title', descKey: 'features.instantDetection.desc' },
  { icon: '💊', titleKey: 'features.treatmentSolutions.title', descKey: 'features.treatmentSolutions.desc' },
  { icon: '📊', titleKey: 'features.trackHistory.title', descKey: 'features.trackHistory.desc' },
];

function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <main>
      <Hero />

      <section className="features-section">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>{t('features.title')}</h2>
          <p>{t('features.subtitle')}</p>
        </motion.div>
        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3>{t(f.titleKey)}</h3>
              <p>{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('cta.title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            {t('cta.subtitle')}
          </motion.p>
          <motion.button
            className="btn-primary btn-lg"
            onClick={() => navigate('/scanner')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {t('cta.button')}
          </motion.button>
        </div>
      </section>
    </main>
  );
}

export default Home;
