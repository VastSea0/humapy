//! Self-update module for the Hüma CLI.
//!
//! Downloads the latest release binary from GitHub Releases and replaces
//! the currently running executable.  Handles network failures, permission
//! errors, and platform detection gracefully.

use anyhow::{Context, Result};
use colored::Colorize;
use tracing::{info, warn};

/// The GitHub repository coordinates used by `self_update`.
const REPO_OWNER: &str = "VastSea0";
const REPO_NAME: &str = "humapy";
const BIN_NAME: &str = "huma";

/// Check whether a newer release exists without performing the actual update.
pub fn check_for_update() -> Result<()> {
    info!("GitHub'da yeni Hüma sürümü kontrol ediliyor…");

    let releases = self_update::backends::github::ReleaseList::configure()
        .repo_owner(REPO_OWNER)
        .repo_name(REPO_NAME)
        .build()
        .context("GitHub release listesine erişilemedi")?
        .fetch()
        .context("GitHub release bilgileri çekilemedi")?;

    let current = env!("CARGO_PKG_VERSION");

    if let Some(latest) = releases.first() {
        let latest_version = latest.version.trim_start_matches('v');
        if latest_version != current {
            println!(
                "\n  {} {} → {}",
                "⬆ Yeni sürüm mevcut:".bright_yellow().bold(),
                current.dimmed(),
                latest_version.bright_green().bold(),
            );
            println!(
                "  {} {}\n",
                "Güncellemek için:".dimmed(),
                "huma update".bright_cyan(),
            );
        } else {
            println!(
                "\n  {} (v{})\n",
                "✓ Hüma güncel.".bright_green().bold(),
                current,
            );
        }
    } else {
        warn!("GitHub'da hiçbir release bulunamadı.");
    }

    Ok(())
}

/// Download the latest GitHub Release binary and replace the current executable.
pub fn run_self_update() -> Result<()> {
    println!(
        "\n  {}",
        "🔄 Hüma güncelleniyor…".bright_cyan().bold()
    );

    let current = env!("CARGO_PKG_VERSION");

    let status = self_update::backends::github::Update::configure()
        .repo_owner(REPO_OWNER)
        .repo_name(REPO_NAME)
        .bin_name(BIN_NAME)
        .show_download_progress(true)
        .current_version(current)
        .build()
        .context("Güncelleme yapılandırması oluşturulamadı")?
        .update()
        .context("Güncelleme sırasında bir hata oluştu. \
                  Ağ bağlantınızı ve dosya izinlerini kontrol edin.")?;

    if status.updated() {
        println!(
            "\n  {} v{} → v{}\n",
            "✅ Güncelleme başarılı!".bright_green().bold(),
            current,
            status.version(),
        );
    } else {
        println!(
            "\n  {} (v{})\n",
            "✓ Hüma zaten güncel.".bright_green().bold(),
            current,
        );
    }

    Ok(())
}
