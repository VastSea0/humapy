mod token;
mod lexer;

use lexer::Lexer;
use token::Token;

fn main() {
    println!("Hüma Tarayıcı (Lexer) Testi");
    println!("---------------------------");

    let kod = r#"
        değişken sayı = 10;
        eğer sayı > 5 {
            yazdır("Sayı büyüktür 5");
        } değilse {
            yazdır("Sayı küçüktür veya eşittir 5");
        }
    "#;

    let mut tarayici = Lexer::new(kod);

    loop {
        let token = tarayici.next_token();
        println!("{:?}", token);
        if token == Token::Son || matches!(token, Token::Hata(_)) {
            break;
        }
    }
}
