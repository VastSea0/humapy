import React from 'react';

export default function Topbar({ onRun, onSave, onNewFile, isRunning, statusText, statusType }) {
  return (
    <div className="topbar">
      <div className="topbar-logo">
        <span className="logo-bird">🐦</span>
        <span className="logo-text">Hüma IDE</span>
      </div>

      <div className="topbar-divider" />

      <div className="topbar-actions">
        <button
          className={`topbar-btn topbar-btn--run ${isRunning ? 'is-running' : ''}`}
          onClick={onRun}
          disabled={isRunning}
          title="Çalıştır (Ctrl+Enter)"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M8 5v14l11-7z" />
          </svg>
          Çalıştır
        </button>

        <button className="topbar-btn" onClick={onSave} title="Kaydet (Ctrl+S)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Kaydet
        </button>

        <button className="topbar-btn" onClick={onNewFile} title="Yeni Dosya">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          Yeni
        </button>
      </div>

      <div className="topbar-spacer" />
      <div className={`topbar-status ${statusType}`}>{statusText}</div>
    </div>
  );
}
