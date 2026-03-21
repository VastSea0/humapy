fn main() {
    println!("🐦 Hüma Modern IDE (Web Tabanlı) başlatılıyor...");
    println!("Sunucu adresi: http://localhost:3737");
    
    let mut server = std::process::Command::new("node")
        .arg("ide/server.js")
        .spawn()
        .expect("IDE başlatılamadı.");
        
    std::thread::sleep(std::time::Duration::from_millis(1500));
    
    #[cfg(target_os = "linux")]
    let _ = std::process::Command::new("xdg-open").arg("http://localhost:3737").status();
    #[cfg(target_os = "windows")]
    let _ = std::process::Command::new("cmd").args(["/C", "start", "http://localhost:3737"]).status();
    #[cfg(target_os = "macos")]
    let _ = std::process::Command::new("open").arg("http://localhost:3737").status();

    let _ = server.wait();
}

