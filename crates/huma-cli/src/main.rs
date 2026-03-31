//! # Hüma CLI — Unified Entry Point
//!
//! ```text
//! hüma run   <dosya.hb>              # Interpreter modunda çalıştır
//! hüma build <dosya.hb> [çıktı.hbc]  # Bytecode'a derle
//! hüma exec  <dosya.hbc>             # Bytecode çalıştır
//! hüma gen   <dosya.hb> [isim]       # Standalone Rust dosyası üret
//! hüma repl                          # Etkileşimli REPL
//! hüma update                        # GitHub'dan son sürüme güncelle
//! hüma version                       # Sürüm bilgisi
//! ```

mod commands;
mod updater;
mod package_manager;

use clap::{Parser, Subcommand};
use colored::Colorize;
use tracing::error;

/// Standardised exit codes for CI/CD compatibility.
mod exit_codes {
    pub const SUCCESS: i32 = 0;
    pub const GENERAL_ERROR: i32 = 1;
    pub const FILE_NOT_FOUND: i32 = 2;
    pub const COMPILATION_ERROR: i32 = 3;
    pub const RUNTIME_ERROR: i32 = 4;
    pub const UPDATE_ERROR: i32 = 5;
}

// ─── CLI Definition ────────────────────────────────────────────────────────

#[derive(Parser)]
#[command(
    name = "huma",
    version,
    about = "Hüma Programlama Dili — Birleşik Araç Takımı",
    long_about = "Hüma diline ait tüm araçları tek bir komut altında birleştirir:\n\
                  derleyici, yorumlayıcı, paket yöneticisi ve güncelleme sistemi."
)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,

    /// Directly run a .hb source file (shortcut for `huma run <dosya>`)
    #[arg(value_name = "DOSYA")]
    file: Option<String>,

    /// Output diagnostics in JSON (machine-readable) format
    #[arg(long, global = true)]
    json: bool,
}

#[derive(Subcommand)]
enum Commands {
    /// Bir Hüma kaynak dosyasını yorumlayıcıda çalıştır
    Run {
        /// Çalıştırılacak .hb dosyası
        file: String,
    },

    /// Bir Hüma kaynak dosyasını bytecode'a derle
    Build {
        /// Derlenecek .hb dosyası
        file: String,

        /// Çıktı bytecode dosyası (varsayılan: cikti.hbc)
        #[arg(short, long, default_value = "cikti.hbc")]
        output: String,

        /// Derleme sonucunu JSON olarak yazdır
        #[arg(long)]
        json: bool,
    },

    /// Derlenmiş bytecode (.hbc) dosyasını VM'de çalıştır
    Exec {
        /// Çalıştırılacak .hbc dosyası
        file: String,
    },

    /// Kaynak dosyadan bağımsız Rust kaynak kodu üret
    Gen {
        /// Girdi .hb dosyası
        file: String,

        /// Çıktı adı (varsayılan: program)
        #[arg(short, long, default_value = "program")]
        output: String,
    },

    /// Etkileşimli REPL (Okuma-Değerlendirme-Yazdırma Döngüsü)
    Repl,

    /// Masaüstü IDE (Geliştirme Ortamı) uygulamasını başlat
    Ide,

    /// Hüma araç takımını GitHub'dan en son sürüme güncelle
    Update {
        /// Mevcut sürümü kontrol et ancak güncelleme yapma
        #[arg(long)]
        check: bool,
    },

    /// Paket yöneticisi (kütüphane kurma, silme, güncelleme)
    Paket {
        #[command(subcommand)]
        action: PackageAction,
    },

    /// Sürüm bilgisini göster
    Version,
}

#[derive(Subcommand)]
pub enum PackageAction {
    /// Yeni bir topluluk paketi kurar
    Kur {
        /// Paketin adı
        name: String,
    },
    /// Kurulu bir paketi siler
    Sil {
        /// Paketin adı
        name: String,
    },
    /// Tüm paketleri günceller
    Güncelle,
}

// ─── Main ──────────────────────────────────────────────────────────────────

fn main() {
    // Initialise structured tracing.
    // Interactive usage → coloured stderr.  JSON flag → machine-readable stdout.
    tracing_subscriber::fmt()
        .with_target(false)
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("info")),
        )
        .with_writer(std::io::stderr)
        .init();

    let cli = Cli::parse();
    let exit_code = run(cli);
    std::process::exit(exit_code);
}

fn run(cli: Cli) -> i32 {
    let result = match cli.command {
        Some(Commands::Run { file }) => commands::run_file(&file),
        Some(Commands::Build { file, output, json }) => commands::build_file(&file, &output, json),
        Some(Commands::Exec { file }) => commands::exec_bytecode(&file),
        Some(Commands::Gen { file, output }) => commands::generate_standalone(&file, &output),
        Some(Commands::Repl) => commands::start_repl(),
        Some(Commands::Ide) => commands::start_ide(),
        Some(Commands::Update { check }) => {
            if check {
                updater::check_for_update()
            } else {
                updater::run_self_update()
            }
        }
        Some(Commands::Paket { action }) => match action {
            PackageAction::Kur { name } => package_manager::install_package(&name),
            PackageAction::Sil { name } => package_manager::remove_package(&name),
            PackageAction::Güncelle => package_manager::update_packages(),
        },
        Some(Commands::Version) => {
            println!(
                "{} {} ({} {})",
                "Hüma".bright_cyan().bold(),
                env!("CARGO_PKG_VERSION").bright_white().bold(),
                std::env::consts::OS,
                std::env::consts::ARCH,
            );
            Ok(())
        }
        // No subcommand — check if a bare file was passed
        None => {
            if let Some(file) = cli.file {
                commands::run_file(&file)
            } else {
                // Default: start the REPL
                commands::start_repl()
            }
        }
    };

    match result {
        Ok(()) => exit_codes::SUCCESS,
        Err(e) => {
            // Try to determine the right exit code from the error chain.
            if let Some(he) = e.downcast_ref::<huma_core::HumaError>() {
                match he {
                    huma_core::HumaError::IoError(_) => {
                        error!("{}", format!("{:#}", e).bright_red());
                        exit_codes::FILE_NOT_FOUND
                    }
                    huma_core::HumaError::CompileError(_)
                    | huma_core::HumaError::SyntaxError { .. } => {
                        error!("{}", format!("{:#}", e).bright_red());
                        exit_codes::COMPILATION_ERROR
                    }
                    huma_core::HumaError::RuntimeError(_) => {
                        error!("{}", format!("{:#}", e).bright_red());
                        exit_codes::RUNTIME_ERROR
                    }
                    _ => {
                        error!("{}", format!("{:#}", e).bright_red());
                        exit_codes::GENERAL_ERROR
                    }
                }
            } else {
                error!("{}", format!("{:#}", e).bright_red());
                exit_codes::GENERAL_ERROR
            }
        }
    }
}
