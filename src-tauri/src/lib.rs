use std::process::Command;
use std::fs;
use std::env;

#[tauri::command]
async fn run_huma(code: String) -> Result<String, String> {
    let tmp_dir = env::temp_dir();
    let tmp_file = tmp_dir.join(format!("tauri_huma_{}.hb", std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_millis()));
    
    fs::write(&tmp_file, code).map_err(|e| e.to_string())?;

    // Try to find the root folder
    let current_exe = env::current_exe().unwrap();
    let mut root_dir = current_exe.parent().unwrap().to_path_buf();
    while !root_dir.join("Cargo.toml").exists() {
        if !root_dir.pop() {
            root_dir = env::current_dir().unwrap_or_else(|_| env::temp_dir());
            break;
        }
    }
    
    let output = Command::new("cargo")
        .args(["run", "--bin", "huma", "--", tmp_file.to_str().unwrap()])
        .current_dir(root_dir)
        .output()
        .map_err(|e| e.to_string())?;

    let _ = fs::remove_file(tmp_file);

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if !stderr.is_empty() && output.status.code() != Some(0) {
        Ok(format!("{}\nHATA: {}", stdout, stderr))
    } else {
        Ok(stdout)
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_huma])
    .setup(|app| {
      if cfg!(debug_assertions) {
        #[allow(unused_must_use)]
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        );
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
