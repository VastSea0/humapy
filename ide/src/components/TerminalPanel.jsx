import React, { useRef, useEffect } from 'react';

export default function TerminalPanel({ height, outputLines, onClear }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputLines]);

  return (
    <div className="terminal-panel" style={{ height: `${height}px` }}>
      <div className="terminal-header">
        <div className="terminal-tab active">
          <span style={{ marginRight: 4, fontSize: '10px' }}>⬛</span>
          Çıktı
        </div>
        <div className="terminal-header-spacer" />
        <button className="terminal-clear-btn" onClick={onClear}>
          ✕ Temizle
        </button>
      </div>

      <div className="output-panel" ref={scrollRef}>
        {outputLines.map((line, i) => {
          if (line.type === 'separator') {
            return <hr key={i} className="out-separator" />;
          }
          return (
            <div key={i} className={`out-line out-${line.type}`}>
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
