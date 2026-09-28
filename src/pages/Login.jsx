import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function Login() {
  const { t, language, changeLanguage } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(language ? 'language' : 'language');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const languages = [
    { code: 'en', label: t('login.english'), flag: '🇬🇧' },
    { code: 'hi', label: t('login.hindi'), flag: '🇮🇳' },
    { code: 'gu', label: t('login.gujarati'), flag: '🇮🇳' },
  ];

  if (step === 'language') {
    return (
      <main className="page-login">
        <div className="login-container language-select-container">
          <motion.div
            className="language-select"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="login-logo">🌿</span>
            <h1>{t('login.brand')}</h1>
            <h2>{t('login.selectLanguage')}</h2>
            <p>{t('login.languageSubtitle')}</p>
            <div className="language-options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`language-option ${language === lang.code ? 'active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span className="language-flag">{lang.flag}</span>
                  <span className="language-name">{lang.label}</span>
                  {language === lang.code && <span className="language-check">✓</span>}
                </button>
              ))}
            </div>
            <button
              className="btn-primary btn-full"
              onClick={() => setStep('login')}
            >
              {t('login.continue')}
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-login">
      <div className="login-container">
        <motion.div
          className="login-brand"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="login-brand-content">
            <span className="login-logo">🌿</span>
            <h1>{t('login.brand')}</h1>
            <p>{t('login.brandSubtitle')}</p>
            <div className="login-features">
              <div className="login-feature">
                <span>📊</span> {t('login.feature1')}
              </div>
              <div className="login-feature">
                <span>📋</span> {t('login.feature2')}
              </div>
              <div className="login-feature">
                <span>💡</span> {t('login.feature3')}
              </div>
            </div>
            <button className="link-btn language-switch" onClick={() => setStep('language')}>
              🌐 {language === 'gu' ? 'ગુજરાતી' : language === 'hi' ? 'हिन्दी' : 'English'} — {t('login.selectLanguage')}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="login-form-wrapper"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="login-form-container">
            <div className="login-tabs">
              <button
                className={`login-tab ${!isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(false)}
              >
                {t('login.signIn')}
              </button>
              <button
                className={`login-tab ${isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(true)}
              >
                {t('login.signUp')}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {isSignUp && (
                <div className="form-group">
                  <label>{t('login.fullName')}</label>
                  <input
                    type="text"
                    placeholder={t('login.fullName')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label>{t('login.email')}</label>
                <input
                  type="email"
                  placeholder={t('login.email')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('login.password')}</label>
                <input
                  type="password"
                  placeholder={t('login.password')}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isSignUp && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" /> {t('login.rememberMe')}
                  </label>
                  <a href="#forgot" className="forgot-link">{t('login.forgotPassword')}</a>
                </div>
              )}
              <button type="submit" className="btn-primary btn-full">
                {isSignUp ? t('login.createAccount') : t('login.signInBtn')}
              </button>
            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <button className="google-btn" onClick={() => navigate('/dashboard')}>
              <svg viewBox="0 0 48 48" className="google-icon">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.87 7.35 2.56 10.58l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {isSignUp ? t('login.signUp') : t('login.signIn')} with Google
            </button>

            <p className="login-footer-text">
              {isSignUp ? t('login.alreadyAccount') : t('login.noAccount')}{' '}
              <button className="link-btn" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? t('login.signIn') : t('login.signUp')}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Login;
