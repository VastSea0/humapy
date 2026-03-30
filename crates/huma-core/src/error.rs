//! Hüma structured error types.
//!
//! Library crates use [`HumaError`] (via `thiserror`) so that callers — the CLI
//! or the IDE — can pattern-match on the variant and decide how to present it
//! (coloured terminal output, JSON for IDEs, etc.).

use thiserror::Error;

/// Top-level error type for the Hüma language toolkit.
#[derive(Debug, Error)]
pub enum HumaError {
    // ── Lexer / Parser ──────────────────────────────────────────────
    #[error("[Sözdizimi Hatası] Satır {line}, Sütun {col}: {message}")]
    SyntaxError {
        line: usize,
        col: usize,
        message: String,
    },

    // ── Runtime ─────────────────────────────────────────────────────
    #[error("[Çalışma Zamanı Hatası] {0}")]
    RuntimeError(String),

    // ── Compiler / Bytecode ─────────────────────────────────────────
    #[error("[Derleme Hatası] {0}")]
    CompileError(String),

    // ── I/O ─────────────────────────────────────────────────────────
    #[error("[Dosya Hatası] {0}")]
    IoError(#[from] std::io::Error),

    // ── Serialization ───────────────────────────────────────────────
    #[error("[Serileştirme Hatası] {0}")]
    SerializationError(String),
}

/// Convenience alias used throughout the core crate.
pub type HumaResult<T> = Result<T, HumaError>;
