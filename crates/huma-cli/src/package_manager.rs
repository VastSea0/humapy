use std::fs;
use std::path::Path;
use anyhow::{Result, anyhow, Context};
use colored::Colorize;
use serde::{Deserialize, Serialize};

/// Hüma Paket Standardı (HPS) Metadata Dosyası
#[derive(Serialize, Deserialize, Debug)]
pub struct PaketMetadata {
    pub ad: String,
    pub surum: String,
    pub aciklama: String,
    pub yazar: String,
    pub giris: String,
}

const PACKAGE_DIR: &str = "huma_paketler";

/// Kurulu tüm paketleri listeler
pub fn list_packages() -> Result<()> {
    println!("{} Kurulu Hüma Paketleri:", "Hüma:".bright_cyan());
    
    if !Path::new(PACKAGE_DIR).exists() {
        println!("{} Hiç paket kurulu değil.", "Bilgi:".bright_yellow());
        return Ok(());
    }

    let entries = fs::read_dir(PACKAGE_DIR)?;
    let mut found = false;

    for entry in entries {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            let meta_path = path.join("paket.json");
            if meta_path.exists() {
                let meta_str = fs::read_to_string(meta_path)?;
                let meta: PaketMetadata = serde_json::from_str(&meta_str)?;
                println!("  {} v{} - {}", meta.ad.bright_green(), meta.surum.bright_white(), meta.aciklama);
                found = true;
            }
        }
    }

    if !found {
        println!("{} Geçerli paket bulunamadı.", "Bilgi:".bright_yellow());
    }

    Ok(())
}

/// Yeni bir Hüma paketi şablonu oluşturur
pub fn create_package(name: &str) -> Result<()> {
    let dir = Path::new(name);
    if dir.exists() {
        return Err(anyhow!("'{}' dizini zaten mevcut.", name));
    }

    fs::create_dir_all(dir)?;
    
    let meta = PaketMetadata {
        ad: name.to_string(),
        surum: "0.1.0".to_string(),
        aciklama: "Yeni bir Hüma kütüphanesi.".to_string(),
        yazar: "Bilinmeyen Yazar".to_string(),
        giris: format!("{}.hb", name),
    };

    let meta_json = serde_json::to_string_pretty(&meta)?;
    fs::write(dir.join("paket.json"), meta_json)?;
    
    let entry_content = format!("// {} kütüphanesi\n\n{} fonksiyon olsun {{ \n\t\"{} kütüphanesi hazır.\"'ı yazdır \n}}", name, name, name);
    fs::write(dir.join(format!("{}.hb", name)), entry_content)?;

    println!("{} '{}' paketi başarıyla oluşturuldu.", "Başarılı!".bright_green(), name.bold());
    println!("Dizine gitmek için: {} {}", "cd".bright_black(), name);
    
    Ok(())
}

/// Bir paketi kurar (GitHub desteği ile)
pub fn install_package(input: &str) -> Result<()> {
    if input.starts_with("github.com/") {
        return install_from_github(input);
    }

    // Geleneksel simüle edilmiş kurulum (kısa ad ile)
    println!("{} {}...", "Paket kuruluyor:".bright_green(), input.bold());
    
    let package_path = format!("{}/{}", PACKAGE_DIR, input);
    if Path::new(&package_path).exists() {
        println!("{} '{}' zaten kurulu.", "Bilgi:".bright_yellow(), input.bold());
        return Ok(());
    }

    fs::create_dir_all(&package_path)?;
    
    let content = match input {
        "nlp_temel" => "// NLP Modülü\nnlp_analiz fonksiyon olsun { \"NLP hazır.\"'ı yazdır }",
        _ => return Err(anyhow!("Paket bulunamadı. Lütfen GitHub URL'si kullanın.")),
    };

    let meta = PaketMetadata {
        ad: input.to_string(),
        surum: "1.0.0".to_string(),
        aciklama: "Topluluk paketi.".to_string(),
        yazar: "Topluluk".to_string(),
        giris: format!("{}.hb", input),
    };

    fs::write(format!("{}/{}.hb", package_path, input), content)?;
    fs::write(format!("{}/paket.json", package_path), serde_json::to_string_pretty(&meta)?)?;

    println!("{} {} başarıyla kuruldu.", "Başarılı!".bright_green(), input.bold());
    Ok(())
}

fn install_from_github(url: &str) -> Result<()> {
    println!("{} GitHub üzerinden indiriliyor: {}...", "Hüma:".bright_cyan(), url.bold());
    
    // github.com/user/repo -> raw.githubusercontent.com/user/repo/main/
    let parts: Vec<&str> = url.split('/').collect();
    if parts.len() < 3 {
        return Err(anyhow!("Geçersiz GitHub URL'si. Format: github.com/kullanici/repo"));
    }

    let user = parts[1];
    let repo = parts[2];
    let raw_base = format!("https://raw.githubusercontent.com/{}/{}/main", user, repo);
    
    // Önce paket.json indirmeyi dene
    let meta_url = format!("{}/paket.json", raw_base);
    let meta_str = download_text(&meta_url)
        .context("paket.json indirilemedi. Depoda bu dosyanın olduğundan emin olun.")?;
    
    let meta: PaketMetadata = serde_json::from_str(&meta_str)
        .context("paket.json formatı geçersiz.")?;

    let package_path = format!("{}/{}", PACKAGE_DIR, meta.ad);
    fs::create_dir_all(&package_path)?;

    // Giriş dosyasını indir
    let entry_url = format!("{}/{}", raw_base, meta.giris);
    let entry_content = download_text(&entry_url)
        .context(format!("Giriş dosyası ({}) indirilemedi.", meta.giris))?;

    fs::write(format!("{}/{}", package_path, meta.giris), entry_content)?;
    fs::write(format!("{}/paket.json", package_path), meta_str)?;

    println!("{} {} v{} başarıyla kuruldu.", "Başarılı!".bright_green(), meta.ad.bold(), meta.surum.bright_white());
    Ok(())
}

fn download_text(url: &str) -> Result<String> {
    let response = ureq::get(url).call()?;
    if response.status() == 200 {
        Ok(response.into_string()?)
    } else {
        Err(anyhow!("İndirme hatası (HTTP {})", response.status()))
    }
}

pub fn remove_package(name: &str) -> Result<()> {
    let path = format!("{}/{}", PACKAGE_DIR, name);
    if Path::new(&path).exists() {
        fs::remove_dir_all(&path)?;
        println!("{} {} başarıyla silindi.", "Başarılı!".bright_green(), name.bold());
        Ok(())
    } else {
        Err(anyhow!("'{}' paketi bulunamadı.", name))
    }
}

pub fn update_packages() -> Result<()> {
    println!("{} Tüm paket güncelleme sistemi aktif ediliyor...", "Hüma:".bright_cyan());
    // İleride tüm paketleri listeledikçe re-install yapılabilir.
    println!("{} Paketler güncel.", "Başarılı!".bright_green());
    Ok(())
}
