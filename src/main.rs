mod token;
mod lexer;
mod ast;
mod parser;

use lexer::Lexer;
use parser::Parser;

fn main() {
    println!("Hüma Ayrıştırıcı (Parser) Testi");
    println!("---------------------------");

    let kod = r#"
        değişken x = 10;
        eğer x > 5 {
            yazdır("Büyük");
        } değilse {
            yazdır("Küçük");
        }
    "#;

    let tarayici = Lexer::new(kod);
    let mut ayristirici = Parser::new(tarayici);

    let program = ayristirici.parse_program();

    for komut in program {
        println!("{:#?}", komut);
    }
}
