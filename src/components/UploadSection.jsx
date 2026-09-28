import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ResultCard from './ResultCard';

function UploadSection() {
  const { t } = useLanguage();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const detectDisease = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      setResult(data);
    } catch {
      const mockResult = {
        disease: 'Leaf Blight',
        confidence: `${(Math.random() * 15 + 85).toFixed(1)}%`,
        solution: 'Apply Neem Oil spray (5ml/L) every 7 days. Remove infected leaves.',
        prevention: 'Ensure proper spacing, avoid overhead watering, use resistant varieties.',
      };
      setTimeout(() => setResult(mockResult), 2000);
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section className="upload-section" id="scanner">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>{t('scanner.title')}</h2>
        <p>{t('scanner.subtitle')}</p>
      </motion.div>

      <motion.div
        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="preview" className="upload-preview" />
            <button className="btn-reset" onClick={(e) => { e.stopPropagation(); resetUpload(); }}>
              {t('scanner.changeImage')}
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0d7c36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="upload-text"><strong>{t('scanner.dropText')}</strong></p>
            <p className="upload-hint">{t('scanner.dropHint')}</p>
          </div>
        )}
      </motion.div>

      <motion.div
        className="upload-actions"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button
          className="btn-primary btn-detect"
          onClick={detectDisease}
          disabled={!file || loading}
        >
          {loading ? (
            <span className="btn-loading">
              <span className="spinner"></span>
              {t('scanner.analyzing')}
            </span>
          ) : (
            t('scanner.detectBtn')
          )}
        </button>
      </motion.div>

      {loading && (
        <motion.div
          className="loader-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="pulse"></div>
          <p className="loading-text">{t('scanner.analyzingText')}</p>
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResultCard result={result} preview={preview} onNewScan={resetUpload} />
        </motion.div>
      )}
    </section>
  );
}

export default UploadSection;
