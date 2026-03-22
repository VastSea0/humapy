use std::fs;
use serde_json::{Value, json};
use huma::interpreter::Yorumlayici;
use huma::lexer::Lexer;
use huma::parser::Parser;
use huma::builtin_files;
use std::rc::Rc;
use std::cell::RefCell;

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
    let mut file_path = filename.clone();
    if !file_path.ends_with(".hb") { file_path.push_str(".hb"); }
    
    fs::write(&file_path, content).map_err(|e| e.to_string())?;
    
    Ok(json!({ "ok": true, "path": file_path }))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_huma, get_libs, get_examples, save_file])
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
