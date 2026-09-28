import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const diseases = [
  { id: 1, icon: '🍅', severity: 'High' },
  { id: 2, icon: '🥔', severity: 'Critical' },
  { id: 3, icon: '🌾', severity: 'High' },
  { id: 4, icon: '🌿', severity: 'Medium' },
  { id: 5, icon: '🌱', severity: 'High' },
  { id: 6, icon: '🍇', severity: 'Medium' },
  { id: 7, icon: '🥜', severity: 'Medium' },
  { id: 8, icon: '🍈', severity: 'High' },
  { id: 9, icon: '🌶️', severity: 'Medium' },
];

function SolutionDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const disease = diseases.find(d => d.id === Number(id));

  if (!disease) {
    return (
      <main className="page-detail">
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>{t('detail.notFound')}</h3>
          <Link to="/solutions" className="btn-primary">{t('detail.backToSolutions')}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-detail">
      <div className="page-header">
        <Link to="/solutions" className="back-link">{t('detail.backToSolutions')}</Link>
      </div>

      <motion.div
        className="detail-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="detail-hero-content">
          <div className="detail-badges">
            <span className="disease-icon large">{disease.icon}</span>
            <span className={`severity-badge ${disease.severity.toLowerCase()}`}>{t('severity.' + disease.severity.toLowerCase())}</span>
            <span className="category-badge">{t('disease.' + disease.id + '.category')}</span>
          </div>
          <h1>{t('disease.' + disease.id + '.name')}</h1>
          <p className="detail-crop">{t('detail.affects')} {t('disease.' + disease.id + '.crop')}</p>
        </div>
      </motion.div>

      <div className="detail-grid">
        <motion.div className="detail-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3>{t('detail.symptoms')}</h3>
          <p>{t('disease.' + disease.id + '.symptoms')}</p>
        </motion.div>

        <motion.div className="detail-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3>{t('detail.causes')}</h3>
          <p>{t('disease.' + disease.id + '.causes')}</p>
        </motion.div>

        <motion.div className="detail-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>{t('detail.chemicalTreatment')}</h3>
          <p>{t('disease.' + disease.id + '.chemical')}</p>
        </motion.div>

        <motion.div className="detail-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3>{t('detail.organicTreatment')}</h3>
          <p>{t('disease.' + disease.id + '.organic')}</p>
        </motion.div>

        <motion.div className="detail-card detail-card-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3>{t('detail.prevention')}</h3>
          <p>{t('disease.' + disease.id + '.prevention')}</p>
        </motion.div>

        <motion.div className="detail-card detail-card-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h3>{t('detail.recommendedTreatment')}</h3>
          <p>{t('disease.' + disease.id + '.treatment')}</p>
        </motion.div>
      </div>

      <div className="detail-cta">
        <p>{t('detail.cta')}</p>
        <Link to="/scanner" className="btn-primary btn-lg">{t('detail.scanNow')}</Link>
      </div>
    </main>
  );
}

export default SolutionDetail;
