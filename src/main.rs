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
        değişken isim = "Hüma";
        değişken sürüm = 0.1;

        yazdır("Hoş geldiniz! Bu projenin adı: " + isim);
        yazdır("Mevcut sürüm: " + sürüm);
        
        değişken x = 15;
        eğer x > 10 {
            yazdır("x değeri 10'dan büyük.");
        } değilse {
            yazdır("x değeri 10'dan küçük veya eşit.");
        }
    "#;

    let tarayici = Lexer::new(kod);
    let mut ayristirici = Parser::new(tarayici);
    let program = ayristirici.parse_program();

    let mut yorumlayici = Yorumlayici::new();
    yorumlayici.yorumla(program);
}
