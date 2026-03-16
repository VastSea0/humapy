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
        fonksiyon topla(a, b) {
            döndür a + b;
        }

        değişken sonuç = topla(10, 20);
        yazdır("10 + 20 = " + sonuç);

        fonksiyon hoşgeldin(isim) {
            yazdır("Merhaba " + isim + "!");
        }

        hoşgeldin("Hüma Kullanıcısı");
    "#;

    let tarayici = Lexer::new(kod);
    let mut ayristirici = Parser::new(tarayici);
    let program = ayristirici.parse_program();

    let mut yorumlayici = Yorumlayici::new();
    yorumlayici.yorumla(program);
}
