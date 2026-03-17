const express = require('express');
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3737;

// Project root is one level up from /ide
const PROJECT_ROOT = path.resolve(__dirname, '..');
const HUMA_BINARY = path.join(PROJECT_ROOT, 'target', 'debug', 'huma');
const LIB_DIR = path.join(PROJECT_ROOT, 'lib');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Run Hüma code
app.post('/api/run', (req, res) => {
  const { code } = req.body;
  if (!code) return res.json({ output: '', error: 'Kod boş.' });

  // Write code to a temp file
  const tmpFile = path.join(os.tmpdir(), `huma_ide_${Date.now()}.hb`);
  fs.writeFileSync(tmpFile, code, 'utf8');

  const startTime = Date.now();

  execFile(
    HUMA_BINARY,
    [tmpFile],
    {
      cwd: PROJECT_ROOT, // run from project root so `yükle` can find ./lib
      timeout: 10000,
      env: { ...process.env }
    },
    (error, stdout, stderr) => {
      const elapsed = Date.now() - startTime;
      try { fs.unlinkSync(tmpFile); } catch (_) {}

      if (error && error.killed) {
        return res.json({ output: stdout, error: 'Zaman aşımı: Program 10 saniyede tamamlanamadı.', elapsed });
      }

      res.json({
        output: stdout,
        error: stderr || (error && !stdout ? error.message : ''),
        elapsed
      });
    }
  );
});

// List example files
app.get('/api/examples', (req, res) => {
  const examplesDir = path.join(PROJECT_ROOT, 'examples');
  try {
    const files = fs.readdirSync(examplesDir).filter(f => f.endsWith('.hb'));
    const examples = files.map(f => ({
      name: f,
      content: fs.readFileSync(path.join(examplesDir, f), 'utf8')
    }));
    res.json(examples);
  } catch (e) {
    res.json([]);
  }
});

// List lib files
app.get('/api/libs', (req, res) => {
  try {
    const files = fs.readdirSync(LIB_DIR).filter(f => f.endsWith('.hb'));
    const libs = files.map(f => ({
      name: f,
      content: fs.readFileSync(path.join(LIB_DIR, f), 'utf8')
    }));
    res.json(libs);
  } catch (e) {
    res.json([]);
  }
});

// Save a file to examples
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;
  if (!filename || !content) return res.json({ ok: false });
  const safe = path.basename(filename).replace(/[^a-zA-Z0-9_ğüşıöçĞÜŞİÖÇ.\-]/g, '_');
  const dest = path.join(PROJECT_ROOT, 'examples', safe.endsWith('.hb') ? safe : safe + '.hb');
  try {
    fs.writeFileSync(dest, content, 'utf8');
    res.json({ ok: true, path: dest });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🐦 Hüma IDE başlatıldı → http://localhost:${PORT}\n`);
});
