import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="page-notfound">
      <div className="notfound-content">
        <span className="notfound-icon">🌿</span>
        <h1>404</h1>
        <h2>{t('notFound.title')}</h2>
        <p>{t('notFound.desc')}</p>
        <Link to="/" className="btn-primary">{t('notFound.button')}</Link>
      </div>
    </main>
  );
}

export default NotFound;
