import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const recentScans = [
  { id: 1, date: '2 hours ago', crop: 'Tomato', disease: 'Early Blight', status: 'treated' },
  { id: 2, date: '2 days ago', crop: 'Rice', disease: 'Leaf Blast', status: 'pending' },
  { id: 3, date: '4 days ago', crop: 'Wheat', disease: 'Rust', status: 'treated' },
];

function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <main className="page-dashboard">
      <div className="dashboard-header">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>{t('dashboard.welcome')}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <button className="btn-primary" onClick={() => navigate('/scanner')}>
            {t('dashboard.newScan')}
          </button>
        </motion.div>
      </div>

      <div className="dashboard-stats">
        {[
          { value: '24', labelKey: 'dashboard.totalScans', icon: '📸', color: '#0d7c36' },
          { value: '18', labelKey: 'dashboard.treated', icon: '✅', color: '#16a34a' },
          { value: '4', labelKey: 'dashboard.pending', icon: '⏳', color: '#d97706' },
          { value: '2', labelKey: 'dashboard.monitoring', icon: '🔬', color: '#2563eb' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <span className="stat-card-icon">{stat.icon}</span>
            <div>
              <p className="stat-card-value">{stat.value}</p>
              <p className="stat-card-label">{t(stat.labelKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="dashboard-card-header">
            <h3>{t('dashboard.recentScans')}</h3>
            <Link to="/history" className="card-link">{t('dashboard.viewAll')}</Link>
          </div>
          <div className="recent-scans-list">
            {recentScans.map(s => (
              <div key={s.id} className="recent-scan-item">
                <div className="recent-scan-info">
                  <span className="recent-crop">{s.crop}</span>
                  <span className="recent-disease">{s.disease}</span>
                  <span className="recent-date">{s.date}</span>
                </div>
                <span className={`status-dot-small ${s.status}`}></span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="dashboard-card-header">
            <h3>{t('dashboard.quickActions')}</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => navigate('/scanner')}>
              <span>🔍</span> {t('dashboard.scanCrops')}
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/solutions')}>
              <span>💊</span> {t('dashboard.findSolutions')}
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/history')}>
              <span>📋</span> {t('dashboard.viewHistory')}
            </button>
            <button className="quick-action-btn">
              <span>📞</span> {t('dashboard.contactExpert')}
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Dashboard;
