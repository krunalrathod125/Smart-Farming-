import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
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
  { id: 10, icon: '🍆', severity: 'Critical' },
];

function Solutions() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const diseaseParam = searchParams.get('disease');
  const [search, setSearch] = useState(diseaseParam || '');
  const [selectedCrop, setSelectedCrop] = useState('all');

  const englishText = {
    1: { name: 'Early Blight', crop: 'Tomato, Potato' },
    2: { name: 'Late Blight', crop: 'Potato, Tomato' },
    3: { name: 'Leaf Blast', crop: 'Rice' },
    4: { name: 'Rust', crop: 'Wheat, Barley' },
    5: { name: 'Bacterial Blight', crop: 'Rice, Cotton' },
    6: { name: 'Powdery Mildew', crop: 'Cucurbits, Grapes' },
    7: { name: 'Leaf Spot', crop: 'Groundnut, Soybean' },
    8: { name: 'Downy Mildew', crop: 'Grapes, Cucurbits' },
    9: { name: 'Anthracnose', crop: 'Chilli, Mango' },
    10: { name: 'Wilt', crop: 'Tomato, Brinjal' },
  };
  const crops = ['all', ...new Set(Object.values(englishText).map(d => d.crop.split(', ')).flat())];

  const filtered = diseases.filter(d => {
    const en = englishText[d.id];
    const matchSearch = en.name.toLowerCase().includes(search.toLowerCase()) ||
      en.crop.toLowerCase().includes(search.toLowerCase());
    const matchCrop = selectedCrop === 'all' || en.crop.includes(selectedCrop);
    return matchSearch && matchCrop;
  });

  return (
    <main className="page-solutions">
      <div className="page-header">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>{t('solutions.title')}</h1>
          <p>{t('solutions.subtitle')}</p>
        </motion.div>
      </div>

      <div className="solutions-toolbar">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={t('solutions.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} className="crop-select">
          {crops.map(c => (
            <option key={c} value={c}>{c === 'all' ? t('solutions.allCrops') : c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>{t('solutions.emptyTitle')}</h3>
          <p>{t('solutions.emptyDesc')}</p>
        </div>
      ) : (
        <div className="solutions-grid">
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              className="disease-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="disease-card-header">
                <span className="disease-icon">{d.icon}</span>
                <div>
                  <h3>{t('disease.' + d.id + '.name')}</h3>
                  <span className="crop-tag">{t('disease.' + d.id + '.crop')}</span>
                </div>
                <span className={`severity-badge ${d.severity.toLowerCase()}`}>{t('severity.' + d.severity.toLowerCase())}</span>
              </div>
              <div className="disease-card-body">
                <div className="disease-detail">
                  <span className="detail-label">{t('solutions.symptoms')}</span>
                  <p>{t('disease.' + d.id + '.symptoms')}</p>
                </div>
                <div className="disease-detail">
                  <span className="detail-label">{t('solutions.treatment')}</span>
                  <p>{t('disease.' + d.id + '.treatment')}</p>
                </div>
                <div className="disease-detail">
                  <span className="detail-label">{t('solutions.prevention')}</span>
                  <p>{t('disease.' + d.id + '.prevention')}</p>
                </div>
              </div>
              <Link to={`/solutions/${d.id}`} className="disease-card-link">
                {t('solutions.viewDetails')}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Solutions;
