import React, { useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';

// Hüma language definition for Monaco
function registerHumaLanguage(monaco) {
  // Only register once
  if (monaco.languages.getLanguages().some(l => l.id === 'huma')) return;

  monaco.languages.register({ id: 'huma' });

  monaco.languages.setMonarchTokensProvider('huma', {
    keywords: [
      'olsun', 'alsın', 'alsin', 'ise', 'yoksa', 'olduğu', 'oldugu',
      'sürece', 'surece', 'yazdır', 'yazdir', 'döndür', 'dondur',
      'fonksiyon', 'sınıf', 'sinif', 'yükle', 'yukle', 'dene', 'hata',
      'var', 've', 'veya', 'değil', 'degil', 'doğru', 'dogru', 'yanlış', 'yanlis',
      'kır', 'kir', 'devam', 'için', 'icin', 'den', 'kadar', 'adım', 'adim',
      'eşleştir', 'eslestir', 'durum', 'her', 'listede',
    ],
    builtins: [
      'uzunluk', 'oku', 'uyut', 'zaman', 'listeye_ekle', 'karekök',
      'rastgele', 'dosya_oku', 'dosya_yaz', 'tipi', 'argümanlar',
      'tamsayıya_çevir', 'ondalığa_çevir', 'metne_çevir',
    ],

    tokenizer: {
      root: [
        [/\/\/.*$/, 'comment'],
        [/"(?:[^"\\]|\\.)*"/, 'string'],
        [/'(?:[^'\\]|\\.)*'/, 'string'],
        [/\b\d+(?:\.\d+)?\b/, 'number'],
        [/[a-zA-ZğüşıöçĞÜŞİÖÇ_][a-zA-Z0-9ğüşıöçĞÜŞİÖÇ_]*/, {
          cases: {
            '@keywords': 'keyword',
            '@builtins': 'type',
            '@default': 'identifier',
          },
        }],
        [/[=!<>]=?|[+\-*\/%.]/,  'operator'],
        [/[{}[\]().,;:]/, 'delimiter'],
        [/\s+/, 'white'],
      ],
    },
  });

  // Custom theme matching our warm-obsidian palette
  monaco.editor.defineTheme('huma-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword',    foreground: 'c792ea', fontStyle: 'bold' },
      { token: 'type',       foreground: '82aaff' },
      { token: 'string',     foreground: 'c3e88d' },
      { token: 'number',     foreground: 'f78c6c' },
      { token: 'comment',    foreground: '546e7a', fontStyle: 'italic' },
      { token: 'identifier', foreground: 'd6dae6' },
      { token: 'operator',   foreground: '89ddff' },
      { token: 'delimiter',  foreground: '89ddff' },
    ],
    colors: {
      'editor.background':                 '#101114',
      'editor.foreground':                 '#d6dae6',
      'editor.lineHighlightBackground':    '#161820',
      'editor.selectionBackground':        '#d4956a22',
      'editor.inactiveSelectionBackground':'#d4956a11',
      'editorCursor.foreground':           '#d4956a',
      'editorLineNumber.foreground':       '#3a4260',
      'editorLineNumber.activeForeground': '#8891a8',
      'editorGutter.background':           '#101114',
      'editorWidget.background':           '#161820',
      'editorWidget.border':               '#282d3c',
      'editorBracketMatch.background':     '#d4956a22',
      'editorBracketMatch.border':         '#d4956a44',
      'scrollbarSlider.background':        '#2c314033',
      'scrollbarSlider.hoverBackground':   '#545d7555',
    },
  });
}

export default function EditorArea({
  openFiles,
  activeFileIdx,
  onTabClick,
  onTabClose,
  onContentChange,
  onRun,
  onSave,
}) {
  const editorRef = useRef(null);

  const handleEditorMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    registerHumaLanguage(monaco);
    monaco.editor.setTheme('huma-dark');

    // Add Ctrl+Enter keybinding for run
    editor.addAction({
      id: 'run-huma',
      label: 'Run Hüma Code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => onRun?.(),
    });

    // Add Ctrl+S keybinding for save
    editor.addAction({
      id: 'save-file',
      label: 'Save File',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => onSave?.(),
    });

    editor.focus();
  }, [onRun, onSave]);

  const handleChange = useCallback((value) => {
    if (activeFileIdx >= 0) {
      onContentChange(activeFileIdx, value || '');
    }
  }, [activeFileIdx, onContentChange]);

  const activeFile = activeFileIdx >= 0 ? openFiles[activeFileIdx] : null;

  // Empty state
  if (openFiles.length === 0 || !activeFile) {
    return (
      <div className="editor-area">
        <div className="editor-empty">
          <div className="empty-bird">🐦</div>
          <div className="empty-text">Hüma IDE'ye Hoşgeldiniz</div>
          <div className="empty-hint">Bir dosya seçin veya yeni dosya oluşturun</div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-area">
      {/* Tabs */}
      <div className="editor-tabs">
        {openFiles.map((file, idx) => (
          <div
            key={file.id}
            className={`editor-tab ${idx === activeFileIdx ? 'active' : ''} ${file.modified ? 'modified' : ''}`}
            onClick={() => onTabClick(idx)}
          >
            <span className="tab-dot" />
            <span>{file.name}</span>
            <span
              className="tab-close"
              onClick={(e) => { e.stopPropagation(); onTabClose(idx); }}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      {/* Editor pane */}
      <div className="editor-pane">
        <Editor
          key={activeFile.id}
          defaultLanguage="huma"
          defaultValue={activeFile.content}
          theme="huma-dark"
          onChange={handleChange}
          onMount={handleEditorMount}
          options={{
            fontFamily: "'IBM Plex Mono', 'Cascadia Code', monospace",
            fontSize: 14,
            lineHeight: 24,
            tabSize: 2,
            insertSpaces: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            renderWhitespace: 'none',
            bracketPairColorization: { enabled: true },
            autoClosingBrackets: 'always',
            matchBrackets: 'always',
            smoothScrolling: true,
            cursorSmoothCaretAnimation: 'on',
            cursorBlinking: 'smooth',
            padding: { top: 12, bottom: 12 },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
              useShadows: false,
            },
            wordWrap: 'off',
            suggestOnTriggerCharacters: false,
            quickSuggestions: false,
          }}
        />
      </div>
    </div>
  );
}
