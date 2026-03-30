//! Implementations for each CLI subcommand.

use anyhow::{Context, Result};
use colored::Colorize;
use huma_core::interpreter::Yorumlayici;
use huma_core::lexer::Lexer;
use huma_core::parser::Parser;
use huma_core::vm::VM;
use std::io::{self, Write};

/// Run a `.hb` source file through the tree-walking interpreter.
pub fn run_file(path: &str) -> Result<()> {
    let source = std::fs::read_to_string(path)
        .with_context(|| format!("'{}' dosyası okunamadı", path))?;

    let interp = Yorumlayici::new();
    let mut interp = interp;
    execute_source(&source, &mut interp);

    // GUI isteği var mı kontrol et
    if huma_core::gui::gui_istegi_var_mi() {
        huma_core::gui::gui_calistir(interp);
    }

    Ok(())
}

/// Compile a `.hb` file to bytecode.
pub fn build_file(input: &str, output: &str, json_output: bool) -> Result<()> {
    if json_output {
        let result = huma_compiler::pipeline::compile_with_diagnostics(input, output)
            .with_context(|| format!("'{}' dosyası derlenirken hata oluştu", input))?;
        println!("{}", serde_json::to_string_pretty(&result)?);
    } else {
        huma_compiler::pipeline::compile_file(input, output)
            .with_context(|| format!("'{}' dosyası derlenirken hata oluştu", input))?;
        println!(
            "{} {} dosyası {} olarak derlendi.",
            "[Başarı]".bright_green().bold(),
            input.bright_white(),
            output.bright_cyan(),
        );
    }
    Ok(())
}

/// Execute a pre-compiled `.hbc` bytecode file in the VM.
pub fn exec_bytecode(path: &str) -> Result<()> {
    let program = huma_compiler::pipeline::load_bytecode(path)
        .with_context(|| format!("'{}' bytecode dosyası yüklenirken hata oluştu", path))?;

    let mut vm = VM::new(program);
    vm.run();
    Ok(())
}

/// Generate a standalone Rust source file from a `.hb` file.
pub fn generate_standalone(input: &str, output_name: &str) -> Result<()> {
    let rs_file = huma_compiler::codegen::generate_standalone(input, output_name)
        .with_context(|| format!("'{}' standalone kod üretimi sırasında hata oluştu", input))?;

    println!(
        "{} {} oluşturuldu. Derlemek için: {}",
        "[Başarı]".bright_green().bold(),
        rs_file.bright_white(),
        format!("rustc {}", rs_file).bright_cyan(),
    );
    Ok(())
}

/// Start the interactive REPL.
pub fn start_repl() -> Result<()> {
    println!(
        "\n{}  {}",
        "🌙 Hüma Programlama Dili".bright_cyan().bold(),
        format!("v{}", env!("CARGO_PKG_VERSION")).dimmed(),
    );
    println!(
        "{}",
        "   Etkileşimli REPL — Çıkmak için 'çıkış' yazın.".dimmed()
    );
    println!();

    let mut interp = Yorumlayici::new();
    let mut input = String::new();

    loop {
        print!("{} ", "hüma ❯".bright_cyan().bold());
        io::stdout().flush()?;

        input.clear();
        if io::stdin().read_line(&mut input).is_err() {
            break;
        }

        let trimmed = input.trim();
        if trimmed == "çıkış" || trimmed == "exit" {
            println!("{}", "Görüşmek üzere! 👋".dimmed());
            break;
        }
        if trimmed.is_empty() {
            continue;
        }

        execute_source(trimmed, &mut interp);
    }
    Ok(())
}

/// Launch the Tauri Desktop IDE.
pub fn start_ide() -> Result<()> {
    println!(
        "\n  {}",
        "🚀 Hüma IDE başlatılıyor…".bright_cyan().bold()
    );
    app_lib::run();
    Ok(())
}

/// Helper: lex → parse → interpret.
fn execute_source(source: &str, interp: &mut Yorumlayici) {
    let lexer = Lexer::new(source);
    let mut parser = Parser::new(lexer);
    let program = parser.parse_program();
    interp.yorumla(program);
}
