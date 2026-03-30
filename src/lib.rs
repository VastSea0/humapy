//! # Hüma — "shim" library crate
//!
//! This crate exists solely for backward compatibility with `src-tauri` which
//! depends on `huma`.  All real logic lives in [`huma_core`].
//!
//! Over time, downstream consumers should migrate to `huma-core` directly.

// Re-export every public module from huma-core so that
// `huma::lexer`, `huma::interpreter`, etc. keep working.
pub use huma_core::*;
