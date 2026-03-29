import React from 'react';

export default function ContextMenu({ x, y, items }) {
  // Adjust position to stay within viewport
  const style = {
    left: Math.min(x, window.innerWidth - 200),
    top: Math.min(y, window.innerHeight - 200),
  };

  return (
    <div className="context-menu" style={style} onClick={(e) => e.stopPropagation()}>
      {items.map((item, i) => {
        if (item.type === 'separator') {
          return <div key={i} className="context-menu-sep" />;
        }
        return (
          <div
            key={i}
            className={`context-menu-item ${item.danger ? 'danger' : ''}`}
            onClick={item.action}
          >
            <span style={{ fontSize: '12px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
