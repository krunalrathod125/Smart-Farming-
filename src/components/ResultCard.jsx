import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function ResultCard({ result, preview, onNewScan }) {
  const { t } = useLanguage();
  if (!result) return null;

  return (
    <div className="result-card">
      <div className="result-card-header">
        <h3>{t('result.title')}</h3>
        <span className="result-badge">{t('result.badge')}</span>
      </div>

      <div className="result-card-body">
        <div className="result-image-section">
          {preview && <img src={preview} alt="Uploaded crop" className="preview-img" />}
        </div>

        <div className="result-details">
          <div className="result-item">
            <span className="result-item-label">{t('result.disease')}</span>
            <span className="result-item-value disease-name">{result.disease}</span>
          </div>

          <div className="result-item">
            <span className="result-item-label">{t('result.confidence')}</span>
            <span className="result-item-value">
              <span className="confidence-bar">
                <motion.span
                  className="confidence-fill"
                  initial={{ width: 0 }}
                  animate={{ width: result.confidence }}
                  transition={{ duration: 1, delay: 0.3 }}
                ></motion.span>
              </span>
              <span className="confidence-text">{result.confidence}</span>
            </span>
          </div>

          <div className="result-item">
            <span className="result-item-label">{t('result.treatment')}</span>
            <span className="result-item-value">{result.solution}</span>
          </div>

          {result.prevention && (
            <div className="result-item">
              <span className="result-item-label">{t('result.prevention')}</span>
              <span className="result-item-value">{result.prevention}</span>
            </div>
          )}
        </div>
      </div>

      <div className="result-card-actions">
        <button className="btn-primary" onClick={onNewScan}>
          {t('result.newScan')}
        </button>
        <button className="btn-secondary">
          {t('result.learnMore')}
        </button>
      </div>
    </div>
  );
}

export default ResultCard;
