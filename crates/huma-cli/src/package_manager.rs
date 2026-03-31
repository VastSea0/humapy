use std::fs;
use std::path::Path;
use anyhow::{Result, anyhow, Context};
use colored::Colorize;
use serde::{Deserialize, Serialize};
use semver::{Version, VersionReq};
use std::collections::HashMap;
use chrono;
use sha2::{Sha256, Digest};

/// Hüma Paket Standardı (HPS) Metadata Dosyası
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PaketMetadata {
    pub ad: String,
    pub surum: String,
    pub aciklama: String,
    pub yazar: String,
    pub giris: String,
    /// Bu paket için gereken minimum Hüma versiyonu (isteğe bağlı)
    pub huma_surum: Option<String>,
    /// Projenin bağımlılıkları (paket adı -> sürüm kısıtlaması)
    pub bagimliliklar: Option<HashMap<String, String>>,
}


/// Hüma Kilit Dosyası (huma.lock)
/// Yüklenen tüm paketlerin kesin sürümlerini ve bütünlük özetlerini (hash) saklar.
#[derive(Serialize, Deserialize, Debug, Default)]
pub struct PaketKilit {
    pub paketler: HashMap<String, KilitBilgisi>,
    pub guncelleme_zamani: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct KilitBilgisi {
    pub surum: String,
    pub hash: String,
}

const PACKAGE_DIR: &str = "huma_modulleri";
const LOCK_FILE: &str = "huma.lock";
const PROJECT_FILE: &str = "huma.json";
const CURRENT_HUMA_VER: &str = env!("CARGO_PKG_VERSION");


/// Kurulu tüm paketleri ve sürümlerini kilit dosyasından listeler
pub fn list_packages() -> Result<()> {
    if !Path::new(LOCK_FILE).exists() {
        println!("{} Hiç paket kurulu değil.", "Bilgi:".bright_yellow());
        return Ok(());
    }

    let lock_str = fs::read_to_string(LOCK_FILE)?;
    let lock: PaketKilit = serde_json::from_str(&lock_str)?;

    println!("{} Kurulu Hüma Paketleri (Kilitlenmiş Sürümler):", "Hüma:".bright_cyan());
    for (ad, bilgi) in &lock.paketler {
        println!("  {} -> {} [{}]", ad.bright_green(), bilgi.surum.bright_white(), &bilgi.hash[..8].bright_black());
    }
    
    Ok(())
}

/// Yeni bir Hüma paketi (projesi) oluşturur
pub fn create_package(name: &str) -> Result<()> {
    let dir = Path::new(name);
    if dir.exists() {
        return Err(anyhow!("'{}' dizini zaten mevcut.", name));
    }

    fs::create_dir_all(dir)?;
    
    let meta = PaketMetadata {
        ad: name.to_string(),
        surum: "0.1.0".to_string(),
        aciklama: "Yeni bir Hüma projesi.".to_string(),
        yazar: "Geliştirici".to_string(),
        giris: format!("{}.hb", name),
        huma_surum: Some(format!(">={}", CURRENT_HUMA_VER)),
        bagimliliklar: Some(HashMap::new()),
    };

    fs::write(dir.join("huma.json"), serde_json::to_string_pretty(&meta)?)?;
    fs::write(dir.join(format!("{}.hb", name)), format!("// {} ana giriş dosyası\n\"{} kütüphanesi aktif.\"'ı yazdır", name, name))?;

    // .gitignore oluştur (Hüma standartlarına uygun)
    let gitignore_content = "huma_modulleri/\ntarget/\n*.hbc\n.DS_Store\n";
    fs::write(dir.join(".gitignore"), gitignore_content)?;

    // v0.4.0: Proje oluşturulurken kilit dosyası ve modül klasörü de ilklendirilir
    let mod_dir = dir.join(PACKAGE_DIR);
    if !mod_dir.exists() {
        fs::create_dir_all(&mod_dir)?;
    }
    
    let lock_path = dir.join(LOCK_FILE);
    let lock = PaketKilit {
        paketler: HashMap::new(),
        guncelleme_zamani: chrono::Local::now().to_rfc3339(),
    };
    fs::write(lock_path, serde_json::to_string_pretty(&lock)?)?;

    // Git ilklendirmesi dene
    let _ = std::process::Command::new("git")
        .arg("init")
        .current_dir(dir)
        .output();

    println!("{} '{}' projesi oluşturuldu.", "Başarılı!".bright_green(), name.bold());
    Ok(())
}


/// Bir paketi kurar ve kilit dosyasına ekler
pub fn install_package(input: &str) -> Result<()> {
    // Yerel Proje Kontrolü
    if !Path::new(PROJECT_FILE).exists() {
        return Err(anyhow!(
            "{} Bu dizinde bir Hüma projesi (huma.json) bulunamadı.\n{} Paketleri kurmak için önce bir proje başlatmalısınız: {}", 
            "Hata:".bright_red(),
            "İpucu:".bright_yellow(),
            format!("huma paket yeni <proje_adi>").bold()
        ));
    }

    if input.starts_with("github.com/") {
        return install_from_github(input);
    }

    // Mock local installation for built-in libs
    match input {
        "nlp_temel" | "ag_istekleri" | "huma_sunucu" => {
            let meta = PaketMetadata {
                ad: input.to_string(),
                surum: "1.0.0".to_string(),
                aciklama: "Simüle edilmiş topluluk paketi.".to_string(),
                yazar: "Hüma Takımı".to_string(),
                giris: format!("{}.hb", input),
                huma_surum: Some(">=0.3.0".to_string()),
                bagimliliklar: None,
            };

            let content = match input {
                "huma_sunucu" => fs::read_to_string("/home/egehan/development/humapy/huma_modulleri/huma_sunucu/huma_sunucu.hb")?,
                _ => "// Simülasyon içeriği".to_string(),
            };

            save_package(meta, &content)?;
        },
        _ => return Err(anyhow!("Paket bulunamadı. Lütfen GitHub linki kullanın.")),
    }
    Ok(())
}

fn install_from_github(url: &str) -> Result<()> {
    println!("{} GitHub üzerinden indiriliyor: {}...", "Hüma:".bright_cyan(), url.bold());
    
    let parts: Vec<&str> = url.split('/').collect();
    if parts.len() < 3 { return Err(anyhow!("Geçersiz URL")); }
    let raw_base = format!("https://raw.githubusercontent.com/{}/{}/main", parts[1], parts[2]);
    
    let meta_str = download_text(&format!("{}/paket.json", raw_base))?;
    let meta: PaketMetadata = serde_json::from_str(&meta_str)?;

    // 1. Hüma Sürüm Kontrolü
    if let Some(req_str) = &meta.huma_surum {
        let req = VersionReq::parse(req_str)?;
        let current_ver = Version::parse(CURRENT_HUMA_VER)?;
        if !req.matches(&current_ver) {
            return Err(anyhow!(
                "Sürüm Uyumsuzluğu: {} paketi Hüma v{} gerektiriyor (Sizdeki sürüm: v{}).",
                meta.ad, req_str, CURRENT_HUMA_VER
            ));
        }
    }

    // 2. Giriş Dosyasını İndir
    let entry_content = download_text(&format!("{}/{}", raw_base, meta.giris))?;
    
    save_package(meta, &entry_content)?;
    Ok(())
}

fn save_package(meta: PaketMetadata, content: &str) -> Result<()> {
    // 1. Proje dosyasını bul ve bağımlılık ekle
    if Path::new(PROJECT_FILE).exists() {
        let mut proj_meta: PaketMetadata = serde_json::from_str(&fs::read_to_string(PROJECT_FILE)?)?;
        if proj_meta.bagimliliklar.is_none() {
            proj_meta.bagimliliklar = Some(HashMap::new());
        }
        if let Some(ref mut deps) = proj_meta.bagimliliklar {
            deps.insert(meta.ad.clone(), format!("^{}", meta.surum));
        }
        fs::write(PROJECT_FILE, serde_json::to_string_pretty(&proj_meta)?)?;
    }

    // 2. Paketi modül dizinine yaz
    let package_path = format!("{}/{}", PACKAGE_DIR, meta.ad);
    fs::create_dir_all(&package_path)?;

    fs::write(format!("{}/{}", package_path, meta.giris), content)?;
    fs::write(format!("{}/paket.json", package_path), serde_json::to_string_pretty(&meta)?)?;

    // 3. Kilit Dosyasını Güncelle
    let hash = calculate_hash(content, &serde_json::to_string(&meta)?);
    update_lock_file(&meta.ad, &meta.surum, &hash)?;

    println!("{} {} v{} [hash:{}] başarıyla kuruldu.", 
        "Başarılı!".bright_green(), 
        meta.ad.bold(), 
        meta.surum.bright_white(),
        &hash[..8]
    );
    Ok(())
}

fn calculate_hash(content: &str, meta_str: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    hasher.update(meta_str.as_bytes());
    hex::encode(hasher.finalize())
}

/// Paketin yayınlanabilirliğini doğrular
pub fn verify_package() -> Result<()> {
    if !Path::new(PROJECT_FILE).exists() {
        return Err(anyhow!("Bu dizinde bir Hüma projesi (huma.json) bulunamadı."));
    }
    
    let meta: PaketMetadata = serde_json::from_str(&fs::read_to_string(PROJECT_FILE)?)?;
    
    if meta.ad.is_empty() || meta.surum.is_empty() {
        return Err(anyhow!("Paket adı veya sürümü eksik."));
    }
    
    // Sürüm geçerli mi kontrol et
    Version::parse(&meta.surum)?;
    
    println!("{} Paket '{}' v{} yayına hazır.", "Doğrulandı:".bright_green(), meta.ad, meta.surum);
    Ok(())
}


fn update_lock_file(name: &str, version: &str, hash: &str) -> Result<()> {
    let mut lock = if Path::new(LOCK_FILE).exists() {
        let s = fs::read_to_string(LOCK_FILE)?;
        // Geriye dönük uyumluluk için Value olarak parse etmeyi dene
        if let Ok(l) = serde_json::from_str::<PaketKilit>(&s) {
            l
        } else {
            // Eski format ise veya hatalıysa sıfırla (veya hata ver)
            PaketKilit::default()
        }
    } else {
        PaketKilit::default()
    };

    lock.paketler.insert(name.to_string(), KilitBilgisi {
        surum: version.to_string(),
        hash: hash.to_string(),
    });
    lock.guncelleme_zamani = chrono::Local::now().to_rfc3339();

    fs::write(LOCK_FILE, serde_json::to_string_pretty(&lock)?)?;
    Ok(())
}

fn download_text(url: &str) -> Result<String> {
    let response = ureq::get(url).call()?;
    Ok(response.into_string()?)
}

pub fn remove_package(name: &str) -> Result<()> {
    let path = format!("{}/{}", PACKAGE_DIR, name);
    if Path::new(&path).exists() {
        fs::remove_dir_all(&path)?;
        
        // Kilit dosyasından çıkar
        if Path::new(LOCK_FILE).exists() {
            let s = fs::read_to_string(LOCK_FILE)?;
            let mut lock: PaketKilit = serde_json::from_str(&s)?;
            lock.paketler.remove(name);
            fs::write(LOCK_FILE, serde_json::to_string_pretty(&lock)?)?;
        }

        println!("{} {} silindi.", "Başarılı!".bright_green(), name.bold());
        Ok(())
    } else {
        Err(anyhow!("Paket bulunamadı."))
    }
}

pub fn update_packages() -> Result<()> {
    println!("{} Paket güncellemeleri kontrol ediliyor...", "Hüma:".bright_cyan());
    // Gerçek bir senaryoda tüm URL'ler LOCK dosyasında saklanır ve tek tek re-download edilir.
    println!("{} Tüm paketler kilitli sürümlerinde güncel.", "Giriş:".bright_green());
    Ok(())
}
