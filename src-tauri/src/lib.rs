use std::fs;
use std::path::{Path, PathBuf};
use serde_json::{Value, json};
use huma::interpreter::Yorumlayici;
use huma::lexer::Lexer;
use huma::parser::Parser;
use huma::builtin_files;
use std::rc::Rc;
use std::cell::RefCell;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct FileNode {
    id: String,
    name: String,
    is_dir: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    content: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    children: Option<Vec<FileNode>>,
}

#[tauri::command]
fn get_project_root() -> Result<String, String> {
    let current_dir = std::env::current_dir().map_err(|e| e.to_string())?;
    Ok(current_dir.to_string_lossy().to_string())
}

#[tauri::command]
fn list_directory(path: String) -> Result<Vec<FileNode>, String> {
    let target = if path.is_empty() {
        std::env::current_dir().map_err(|e| e.to_string())?
    } else {
        PathBuf::from(path)
    };

    let mut nodes = Vec::new();

    if target.is_dir() {
        for entry in fs::read_dir(target).map_err(|e| e.to_string())? {
            if let Ok(entry) = entry {
                let path = entry.path();
                let is_dir = path.is_dir();
                let name = entry.file_name().to_string_lossy().to_string();
                
                // Skip hidden files/directories and build folders
                if name.starts_with('.') || name == "target" || name == "node_modules" {
                    continue;
                }

                let content = if !is_dir && name.ends_with(".hb") {
                    fs::read_to_string(&path).ok()
                } else {
                    None
                };

                let children = if is_dir {
                    Some(Vec::new()) // To be lazy-loaded by the frontend or expanded recursively
                } else {
                    None
                };

                nodes.push(FileNode {
                    id: path.to_string_lossy().to_string(),
                    name,
                    is_dir,
                    content,
                    children,
                });
            }
        }
    }

    // Sort: directories first, then alphabetical
    nodes.sort_by(|a, b| {
        b.is_dir.cmp(&a.is_dir).then_with(|| a.name.to_lowercase().cmp(&b.name.to_lowercase()))
    });

    Ok(nodes)
}

#[tauri::command]
async fn run_huma(code: String) -> Result<String, String> {
    let output_capture = Rc::new(RefCell::new(String::new()));
    let mut interp = Yorumlayici::new().with_output_buffer(output_capture.clone());
    
    let lexer = Lexer::new(&code);
    let mut parser = Parser::new(lexer);
    let program = parser.parse_program();
    
    interp.yorumla(program);
    
    Ok(output_capture.borrow().to_string())
}

#[tauri::command]
fn get_libs() -> Value {
    let libs = builtin_files::get_lib_files();
    json!(libs.iter().map(|(n, c)| json!({ "name": n, "content": c })).collect::<Vec<_>>())
}

#[tauri::command]
fn get_examples() -> Value {
    let examples = builtin_files::get_example_files();
    json!(examples.iter().map(|(n, c)| json!({ "name": n, "content": c })).collect::<Vec<_>>())
}

#[tauri::command]
async fn save_file(filename: String, content: String) -> Result<Value, String> {
    // Determine target path
    let target = PathBuf::from(&filename);
    let mut file_path = if target.is_absolute() {
        target
    } else {
        std::env::current_dir().unwrap_or_default().join(filename)
    };

    if file_path.extension().is_none() {
        file_path.set_extension("hb");
    }
    
    fs::write(&file_path, content).map_err(|e| e.to_string())?;
    
    Ok(json!({ "ok": true, "path": file_path.to_string_lossy().to_string() }))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        run_huma, 
        get_libs, 
        get_examples, 
        save_file, 
        list_directory, 
        get_project_root
    ])
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
