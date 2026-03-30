// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    
    // If we have arguments (e.g. `huma run script.hb`), run the CLI directly.
    // Except if the argument is `--ide` or if there are no arguments at all,
    // in which case we launch the Tauri desktop application.
    if args.len() > 1 && args[1] != "--ide" {
        huma::cli::run_cli(args);
        return;
    }

    app_lib::run();
}
