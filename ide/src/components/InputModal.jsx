import React, { useRef, useEffect, useState } from 'react';

export default function InputModal({ title, placeholder, defaultValue, onSubmit, onClose }) {
  const [value, setValue] = useState(defaultValue || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value.trim());
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <input
          ref={inputRef}
          className="modal-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="modal-actions">
          <button className="modal-btn" onClick={onClose}>İptal</button>
          <button className="modal-btn modal-btn--primary" onClick={() => onSubmit(value.trim())}>
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
}
