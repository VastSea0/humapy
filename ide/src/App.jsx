import React, { useState, useCallback, useRef, useEffect } from 'react';
import Topbar from './components/Topbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import EditorArea from './components/EditorArea.jsx';
import TerminalPanel from './components/TerminalPanel.jsx';
import ContextMenu from './components/ContextMenu.jsx';
import InputModal from './components/InputModal.jsx';

// Detect Tauri environment
const IS_TAURI = !!(window.__TAURI__ || window.__TAURI_INTERNALS__);

function getInvoke() {
  if (window.__TAURI__?.invoke) return window.__TAURI__.invoke;
  if (window.__TAURI__?.core?.invoke) return window.__TAURI__.core.invoke;
  if (window.__TAURI_INTERNALS__?.invoke) return window.__TAURI_INTERNALS__.invoke;
  return null;
}

export default function App() {
  // ── File tree state ──
  const [fileTree, setFileTree] = useState([]);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFileIdx, setActiveFileIdx] = useState(-1);

  // ── Terminal / output ──
  const [outputLines, setOutputLines] = useState([
    { type: 'system', text: '// Hüma IDE — Ctrl+Enter ile çalıştır' },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [statusText, setStatusText] = useState('Hazır');
  const [statusType, setStatusType] = useState('');

  // ── Terminal height (resizable) ──
  const [terminalHeight, setTerminalHeight] = useState(220);

  // ── Context menu ──
  const [ctxMenu, setCtxMenu] = useState(null);

  // ── Modal ──
  const [modal, setModal] = useState(null);

  // ── Project root ──
  const [projectRoot, setProjectRoot] = useState('');

  // Load sidebar data on mount
  useEffect(() => {
    loadSidebarData();
  }, []);

  // Close context menu on any click
  useEffect(() => {
    const handler = () => setCtxMenu(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  async function loadSidebarData() {
    const invoke = getInvoke();
    let examples = [], libs = [];

    if (invoke) {
      try {
        examples = await invoke('get_examples');
        libs = await invoke('get_libs');
        // Try to get project root
        try {
          const root = await invoke('get_project_root');
          setProjectRoot(root);
        } catch (e) { /* ignore */ }
        // Try to get user files
        try {
          const userFiles = await invoke('list_directory', { path: '' });
          const tree = buildTree(examples, libs, userFiles);
          setFileTree(tree);
          return;
        } catch (e) { /* fallback */ }
      } catch (e) {
        console.error('Tauri load error:', e);
      }
    } else {
      // Web fallback
      try {
        const [exRes, libRes] = await Promise.all([
          fetch('/api/examples').then(r => r.json()),
          fetch('/api/libs').then(r => r.json()),
        ]);
        examples = exRes || [];
        libs = libRes || [];
      } catch (e) {
        console.error('Web load error:', e);
      }
    }

    setFileTree(buildTree(examples, libs, []));
  }

  function buildTree(examples, libs, userFiles) {
    const tree = [];

    if (examples?.length > 0) {
      tree.push({
        id: '__examples',
        name: 'Örnekler',
        isDir: true,
        isSection: true,
        expanded: true,
        children: examples.map(f => ({
          id: `ex_${f.name}`,
          name: f.name,
          isDir: false,
          content: f.content,
          source: 'example',
        })),
      });
    }

    if (libs?.length > 0) {
      tree.push({
        id: '__libs',
        name: 'Kütüphaneler',
        isDir: true,
        isSection: true,
        expanded: false,
        children: libs.map(f => ({
          id: `lib_${f.name}`,
          name: f.name,
          isDir: false,
          content: f.content,
          source: 'lib',
        })),
      });
    }

    if (userFiles?.length > 0) {
      tree.push({
        id: '__user',
        name: 'Dosyalar',
        isDir: true,
        isSection: true,
        expanded: true,
        children: userFiles.map(f => ({
          id: `user_${f.name}`,
          name: f.name,
          isDir: f.is_dir,
          content: f.content || '',
          source: 'user',
          children: f.children || [],
        })),
      });
    }

    return tree;
  }

  // ── Open a file in editor ──
  const openFile = useCallback((fileNode) => {
    // Check if already open
    const existingIdx = openFiles.findIndex(f => f.id === fileNode.id);
    if (existingIdx >= 0) {
      setActiveFileIdx(existingIdx);
      return;
    }

    const newFile = {
      id: fileNode.id,
      name: fileNode.name,
      content: fileNode.content || '',
      originalContent: fileNode.content || '',
      modified: false,
      source: fileNode.source,
    };
    setOpenFiles(prev => [...prev, newFile]);
    setActiveFileIdx(openFiles.length);
  }, [openFiles]);

  // ── Close a tab ──
  const closeTab = useCallback((idx) => {
    setOpenFiles(prev => {
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
    setActiveFileIdx(prev => {
      if (idx < prev) return prev - 1;
      if (idx === prev) return Math.min(prev, openFiles.length - 2);
      return prev;
    });
  }, [openFiles.length]);

  // ── Update file content ──
  const updateFileContent = useCallback((idx, newContent) => {
    setOpenFiles(prev => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        content: newContent,
        modified: newContent !== next[idx].originalContent,
      };
      return next;
    });
  }, []);

  // ── Run code ──
  const runCode = useCallback(async () => {
    const activeFile = openFiles[activeFileIdx];
    if (!activeFile || isRunning) return;

    setIsRunning(true);
    setStatusText('Çalışıyor…');
    setStatusType('running');

    const code = activeFile.content;
    const time = new Date().toLocaleTimeString('tr-TR');

    setOutputLines(prev => [
      ...prev,
      { type: 'separator' },
      { type: 'system', text: `▶ Çalıştırılıyor… (${time})` },
    ]);

    const startTime = Date.now();
    let output = '', error = '';

    try {
      const invoke = getInvoke();
      if (invoke) {
        try {
          output = await invoke('run_huma', { code });
        } catch (e) {
          error = e.toString();
        }
      } else {
        const res = await fetch('/api/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        const data = await res.json();
        output = data.output || '';
        error = data.error || '';
      }
    } catch (e) {
      error = 'Bağlantı hatası: ' + e.message;
    }

    const elapsed = Date.now() - startTime;
    const newLines = [];

    if (output) {
      output.split('\n').forEach(line => {
        if (line !== '') newLines.push({ type: 'stdout', text: line });
      });
    }
    if (error) {
      error.split('\n').forEach(line => {
        if (line !== '') newLines.push({ type: 'stderr', text: line });
      });
    }

    const hasError = error && error.trim();
    newLines.push({
      type: 'timing',
      text: `⏱ ${elapsed}ms — ${hasError ? '❌ Hata' : '✅ Başarıyla tamamlandı'}`,
    });

    setOutputLines(prev => [...prev, ...newLines]);
    setIsRunning(false);
    setStatusText(hasError ? 'Hata' : 'Başarılı');
    setStatusType(hasError ? 'err' : 'ok');

    setTimeout(() => {
      setStatusText('Hazır');
      setStatusType('');
    }, 4000);
  }, [openFiles, activeFileIdx, isRunning]);

  // ── Save file ──
  const saveFile = useCallback(async (filename) => {
    const activeFile = openFiles[activeFileIdx];
    if (!activeFile) return;

    const content = activeFile.content;
    const invoke = getInvoke();
    let res;

    try {
      if (invoke) {
        res = await invoke('save_file', { filename, content });
      } else {
        res = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, content }),
        }).then(r => r.json());
      }
    } catch (e) {
      res = { error: e.message };
    }

    if (res?.ok) {
      setOutputLines(prev => [
        ...prev,
        { type: 'system', text: `✅ Kaydedildi: ${res.path}` },
      ]);
      // Update the filename and clear modified flag
      setOpenFiles(prev => {
        const next = [...prev];
        const fname = filename.endsWith('.hb') ? filename : filename + '.hb';
        next[activeFileIdx] = {
          ...next[activeFileIdx],
          name: fname,
          originalContent: content,
          modified: false,
        };
        return next;
      });
      loadSidebarData();
    } else {
      setOutputLines(prev => [
        ...prev,
        { type: 'stderr', text: `❌ Kaydetme hatası: ${res?.error || 'Bilinmeyen'}` },
      ]);
    }
  }, [openFiles, activeFileIdx]);

  // ── New file via sidebar action ──
  const handleNewFile = useCallback(() => {
    setModal({
      title: 'Yeni Dosya',
      placeholder: 'dosya_adı.hb',
      onSubmit: (name) => {
        if (!name) return;
        const fname = name.endsWith('.hb') ? name : name + '.hb';
        const newFile = {
          id: `new_${Date.now()}_${fname}`,
          name: fname,
          content: `// ${fname}\n\n`,
          originalContent: '',
          modified: true,
          source: 'user',
        };
        setOpenFiles(prev => [...prev, newFile]);
        setActiveFileIdx(openFiles.length);
        setModal(null);
      },
    });
  }, [openFiles.length]);

  // ── Clear output ──
  const clearOutput = useCallback(() => {
    setOutputLines([{ type: 'system', text: '// Terminal temizlendi' }]);
  }, []);

  // ── Toggle folder expand ──
  const toggleFolder = useCallback((folderId) => {
    setFileTree(prev => toggleFolderInTree(prev, folderId));
  }, []);

  function toggleFolderInTree(nodes, id) {
    return nodes.map(n => {
      if (n.id === id) return { ...n, expanded: !n.expanded };
      if (n.children) return { ...n, children: toggleFolderInTree(n.children, id) };
      return n;
    });
  }

  // ── Save modal shortcut ──
  const handleSaveModal = useCallback(() => {
    const activeFile = openFiles[activeFileIdx];
    if (!activeFile) return;
    setModal({
      title: '💾 Dosya Kaydet',
      placeholder: 'dosya_adı.hb',
      defaultValue: activeFile.name,
      onSubmit: (name) => {
        saveFile(name);
        setModal(null);
      },
    });
  }, [openFiles, activeFileIdx, saveFile]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveModal();
      }
      if (e.key === 'Escape') {
        setModal(null);
        setCtxMenu(null);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleSaveModal]);

  // ── Context menu handler ──
  const handleContextMenu = useCallback((e, node) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: 'Aç', icon: '📄', action: () => { if (!node.isDir) openFile(node); setCtxMenu(null); } },
        { label: 'Yeni Dosya', icon: '📝', action: () => { handleNewFile(); setCtxMenu(null); } },
        { type: 'separator' },
        {
          label: 'Sil', icon: '🗑️', danger: true, action: () => {
            // Close the tab if open
            const tabIdx = openFiles.findIndex(f => f.id === node.id);
            if (tabIdx >= 0) closeTab(tabIdx);
            setCtxMenu(null);
          }
        },
      ],
    });
  }, [openFile, handleNewFile, openFiles, closeTab]);

  // ── Resize handler ──
  const resizeRef = useRef(null);
  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = terminalHeight;

    const onMove = (me) => {
      const delta = startY - me.clientY;
      const newH = Math.max(80, Math.min(window.innerHeight - 200, startHeight + delta));
      setTerminalHeight(newH);
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ns-resize';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [terminalHeight]);

  const activeFile = activeFileIdx >= 0 ? openFiles[activeFileIdx] : null;

  return (
    <div className="app-shell">
      <Topbar
        onRun={runCode}
        onSave={handleSaveModal}
        onNewFile={handleNewFile}
        isRunning={isRunning}
        statusText={statusText}
        statusType={statusType}
      />

      <div className="main-content">
        <Sidebar
          fileTree={fileTree}
          activeFileId={activeFile?.id}
          onFileClick={openFile}
          onFolderToggle={toggleFolder}
          onNewFile={handleNewFile}
          onContextMenu={handleContextMenu}
        />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <EditorArea
            openFiles={openFiles}
            activeFileIdx={activeFileIdx}
            onTabClick={setActiveFileIdx}
            onTabClose={closeTab}
            onContentChange={updateFileContent}
            onRun={runCode}
            onSave={handleSaveModal}
          />

          <div
            className={`resize-handle-h`}
            onMouseDown={handleResizeStart}
          />

          <TerminalPanel
            height={terminalHeight}
            outputLines={outputLines}
            onClear={clearOutput}
          />
        </div>
      </div>

      {ctxMenu && <ContextMenu {...ctxMenu} />}
      {modal && <InputModal {...modal} onClose={() => setModal(null)} />}
    </div>
  );
}
