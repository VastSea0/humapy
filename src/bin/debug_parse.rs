use huma::parser::Parser;
use huma::lexer::Lexer;
use std::fs;

fn main() {
    let code = std::fs::read_to_string("tests/test_liste_dongu.hb").unwrap_or_else(|_| "".to_string());
    println!("--- TEST (test_liste_dongu.hb) ---");
    let lexer = Lexer::new(&code);
    let mut parser = Parser::new(lexer);
    let program = parser.parse_program();
    println!("{:#?}", program);
}
