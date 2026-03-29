import React from 'react';

function TreeNode({ node, activeFileId, onFileClick, onFolderToggle, onContextMenu, depth = 0 }) {
  const isExpanded = node.expanded;

  const handleClick = (e) => {
    if (node.isDir) {
      onFolderToggle(node.id);
    } else {
      onFileClick(node);
    }
  };

  const handleContext = (e) => {
    if (onContextMenu) onContextMenu(e, node);
  };

  if (node.isSection) {
    return (
      <div>
        <div
          className="tree-item"
          onClick={handleClick}
          onContextMenu={handleContext}
          style={{ paddingLeft: `${8 + depth * 12}px` }}
        >
          <span className="tree-chevron" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6l6 6-6 6z"/></svg>
          </span>
          <span className="tree-name" style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--text-ghost)',
          }}>{node.name}</span>
        </div>
        {isExpanded && node.children && (
          <div className="tree-children">
            {node.children.map(child => (
              <TreeNode
                key={child.id}
                node={child}
                activeFileId={activeFileId}
                onFileClick={onFileClick}
                onFolderToggle={onFolderToggle}
                onContextMenu={onContextMenu}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (node.isDir) {
    return (
      <div>
        <div
          className="tree-item"
          onClick={handleClick}
          onContextMenu={handleContext}
          style={{ paddingLeft: `${8 + depth * 12}px` }}
        >
          <span className="tree-chevron" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6l6 6-6 6z"/></svg>
          </span>
          <span className="tree-icon">{isExpanded ? '📂' : '📁'}</span>
          <span className="tree-name">{node.name}</span>
        </div>
        {isExpanded && node.children && (
          <div className="tree-children">
            {node.children.map(child => (
              <TreeNode
                key={child.id}
                node={child}
                activeFileId={activeFileId}
                onFileClick={onFileClick}
                onFolderToggle={onFolderToggle}
                onContextMenu={onContextMenu}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // File node
  const fileIcon = node.source === 'lib' ? '📦' : '📄';
  const isActive = node.id === activeFileId;

  return (
    <div
      className={`tree-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      onContextMenu={handleContext}
      style={{ paddingLeft: `${8 + depth * 12 + 14}px` }}
      title={node.name}
    >
      <span className="tree-icon">{fileIcon}</span>
      <span className="tree-name">{node.name}</span>
    </div>
  );
}

export default function Sidebar({ fileTree, activeFileId, onFileClick, onFolderToggle, onNewFile, onContextMenu }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Gezgin</span>
        <div className="sidebar-actions">
          <button className="sidebar-icon-btn" onClick={onNewFile} title="Yeni Dosya">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="sidebar-tree">
        {fileTree.length === 0 && (
          <div style={{ padding: '12px 8px', fontSize: '11px', color: 'var(--text-ghost)' }}>
            Yükleniyor…
          </div>
        )}
        {fileTree.map(node => (
          <TreeNode
            key={node.id}
            node={node}
            activeFileId={activeFileId}
            onFileClick={onFileClick}
            onFolderToggle={onFolderToggle}
            onContextMenu={onContextMenu}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
}
