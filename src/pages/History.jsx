import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const allHistory = [
  { id: 1, date: '2026-05-08', crop: 'Tomato', disease: 'Early Blight', confidence: '96%', status: 'treated', solution: 'Apply Chlorothalonil' },
  { id: 2, date: '2026-05-06', crop: 'Rice', disease: 'Leaf Blast', confidence: '93%', status: 'pending', solution: 'Use Tricyclazole' },
  { id: 3, date: '2026-05-04', crop: 'Wheat', disease: 'Rust', confidence: '98%', status: 'treated', solution: 'Apply Mancozeb' },
  { id: 4, date: '2026-05-02', crop: 'Potato', disease: 'Late Blight', confidence: '91%', status: 'monitoring', solution: 'Copper-based fungicide' },
  { id: 5, date: '2026-04-28', crop: 'Maize', disease: 'Northern Leaf Blight', confidence: '95%', status: 'treated', solution: 'Azoxystrobin application' },
  { id: 6, date: '2026-04-25', crop: 'Tomato', disease: 'Healthy', confidence: '99%', status: 'healthy', solution: 'No treatment needed' },
  { id: 7, date: '2026-04-20', crop: 'Rice', disease: 'Sheath Blight', confidence: '88%', status: 'pending', solution: 'Validamycin spray' },
  { id: 8, date: '2026-04-18', crop: 'Cotton', disease: 'Boll Rot', confidence: '94%', status: 'treated', solution: 'Remove infected bolls' },
];

const filterLabels = {
  all: 'history.filterAll',
  treated: 'history.filterTreated',
  pending: 'history.filterPending',
  monitoring: 'history.filterMonitoring',
  healthy: 'history.filterHealthy',
};

function History() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? allHistory : allHistory.filter(h => h.status === filter);

  const statusColor = (s) => {
    switch (s) {
      case 'treated': return 'var(--success)';
      case 'pending': return 'var(--warning)';
      case 'monitoring': return 'var(--info)';
      case 'healthy': return 'var(--success)';
      default: return '#888';
    }
  };

  return (
    <main className="page-history">
      <div className="page-header">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>{t('history.title')}</h1>
          <p>{t('history.subtitle')}</p>
        </motion.div>
      </div>

      <div className="history-filters">
        {['all', 'treated', 'pending', 'monitoring', 'healthy'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {t(filterLabels[f])}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>{t('history.emptyTitle')}</h3>
          <p>{t('history.emptyDesc')}</p>
          <Link to="/scanner" className="btn-primary">{t('history.goScanner')}</Link>
        </div>
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>{t('history.date')}</th>
                <th>{t('history.crop')}</th>
                <th>{t('history.disease')}</th>
                <th>{t('history.confidence')}</th>
                <th>{t('history.status')}</th>
                <th>{t('history.action')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <motion.tr
                  key={h.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>{h.date}</td>
                  <td><span className="crop-badge">{h.crop}</span></td>
                  <td>{h.disease}</td>
                  <td><span className="confidence-cell">{h.confidence}</span></td>
                  <td>
                    <span className="status-badge" style={{ background: statusColor(h.status) + '20', color: statusColor(h.status) }}>
                      {h.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/solutions?disease=${encodeURIComponent(h.disease)}`} className="btn-sm">
                      {t('history.viewSolution')}
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default History;
