#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;
use std::fs;
use std::env;

#[tauri::command]
async fn run_huma(code: String) -> Result<String, String> {
    let tmp_dir = env::temp_dir();
    let tmp_file = tmp_dir.join(format!("tauri_huma_{}.hb", std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_millis()));
    
    fs::write(&tmp_file, code).map_err(|e| e.to_string())?;

    // We assume 'huma' binary is in the target/debug or target/release folder relative to workspace
    // For development, we'll try to find it.
    let current_exe = env::current_exe().unwrap();
    let project_root = current_exe.parent().unwrap().parent().unwrap().parent().unwrap(); // Adjust based on build structure
    
    // Simpler: just use 'cargo run' or locate binary in parent directories
    let output = Command::new("cargo")
        .args(["run", "--bin", "huma", "--", tmp_file.to_str().unwrap()])
        .current_dir(project_root) // Run from project root to find 'lib/'
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

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_huma])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
