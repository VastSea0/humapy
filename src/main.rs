mod token;
mod lexer;
mod ast;
mod parser;
mod interpreter;

use lexer::Lexer;
use parser::Parser;
use interpreter::Yorumlayici;
use std::io::{self, Write};

fn main() {
    println!("Hüma Programlama Dili");
    println!("---------------------");
    
    let kod = r#"
        değişken sayaç = 1;
        döngü sayaç < 6 {
            yazdır("Sayaç şu an: " + sayaç);
            sayaç = sayaç + 1;
        }
        yazdır("Döngü bitti!");
    "#;

    let tarayici = Lexer::new(kod);
    let mut ayristirici = Parser::new(tarayici);
    let program = ayristirici.parse_program();

    let mut yorumlayici = Yorumlayici::new();
    yorumlayici.yorumla(program);
}
