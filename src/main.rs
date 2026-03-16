mod token;
mod lexer;
mod ast;
mod parser;
mod interpreter;

use lexer::Lexer;
use parser::Parser;
use interpreter::Yorumlayici;
use std::io::{self, Write};
use std::fs;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() > 1 {
        dosya_calistir(&args[1]);
    } else {
        repl_baslat();
    }
}

fn dosya_calistir(yol: &str) {
    let icerik = match fs::read_to_string(yol) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("Dosya okunamadı: {}", e);
            return;
        }
    };

    let mut yorumlayici = Yorumlayici::new();
    calistir(&icerik, &mut yorumlayici);
}

fn repl_baslat() {
    println!("Hüma Programlama Dili [REPL]");
    println!("Çıkmak için 'çıkış' yazın.");
    
    let mut yorumlayici = Yorumlayici::new();
    let mut input = String::new();

    loop {
        print!("hüma > ");
        io::stdout().flush().unwrap();
        
        input.clear();
        if io::stdin().read_line(&mut input).is_err() {
            break;
        }

        let trim_input = input.trim();
        if trim_input == "çıkış" {
            break;
        }

        calistir(trim_input, &mut yorumlayici);
    }
}

fn calistir(kod: &str, yorumlayici: &mut Yorumlayici) {
    let tarayici = Lexer::new(kod);
    let mut ayristirici = Parser::new(tarayici);
    let program = ayristirici.parse_program();
    yorumlayici.yorumla(program);
}
