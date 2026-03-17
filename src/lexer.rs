use crate::token::Token;

pub struct Lexer {
    input: Vec<char>,
    pos: usize,
    line: usize,
    col: usize,
}

impl Lexer {
    pub fn new(input: &str) -> Self {
        Self {
            input: input.chars().collect(),
            pos: 0,
            line: 1,
            col: 1,
        }
    }

    fn peek(&self) -> Option<char> {
        self.input.get(self.pos).copied()
    }

    fn advance(&mut self) -> Option<char> {
        let ch = self.peek();
        if let Some(c) = ch {
            self.pos += 1;
            if c == '\n' {
                self.line += 1;
                self.col = 1;
            } else {
                self.col += 1;
            }
        }
        ch
    }

    pub fn get_pos(&self) -> (usize, usize) {
        (self.line, self.col)
    }

    fn skip_whitespace(&mut self) {
        while let Some(ch) = self.peek() {
            if ch.is_whitespace() {
                self.advance();
            } else {
                break;
            }
        }
    }

    pub fn next_token(&mut self) -> Token {
        self.skip_whitespace();

        let ch = match self.advance() {
            Some(ch) => ch,
            None => return Token::Son,
        };

        match ch {
            '(' => Token::AcikParantez,
            ')' => Token::KapaliParantez,
            '{' => Token::AcikSuskun,
            '}' => Token::KapaliSuskun,
            '[' => Token::AcikKose,
            ']' => Token::KapaliKose,
            ',' => Token::Virgul,
            ';' => Token::NoktaliVirgul,
            '.' => Token::Nokta,
            '+' => Token::Arti,
            '-' => Token::Eksi,
            '*' => Token::Carpi,
            '/' => {
                if self.peek() == Some('/') {
                    while let Some(c) = self.advance() {
                        if c == '\n' { break; }
                    }
                    self.next_token()
                } else {
                    Token::Bolnu
                }
            }
            '=' => {
                if self.peek() == Some('=') {
                    self.advance();
                    Token::EsitEsittir
                } else {
                    Token::Esittir
                }
            }
            '>' => {
                if self.peek() == Some('=') {
                    self.advance();
                    Token::BuyukEsit
                } else {
                    Token::Buyuktur
                }
            }
            '<' => {
                if self.peek() == Some('=') {
                    self.advance();
                    Token::KucukEsit
                } else {
                    Token::Kucuktur
                }
            }
            '!' => {
                if self.peek() == Some('=') {
                    self.advance();
                    Token::EsitDegil
                } else {
                    Token::Hata("Beklenmeyen karakter: !".to_string())
                }
            }
            '%' => Token::Mod,
            '"' => self.read_string(),
            '0'..='9' => self.read_number(ch),
            'a'..='z' | 'A'..='Z' | '_' | 'ç' | 'ğ' | 'ı' | 'ö' | 'ş' | 'ü' | 'Ç' | 'Ğ' | 'İ' | 'Ö' | 'Ş' | 'Ü' => {
                self.read_identifier(ch)
            }
            _ => Token::Hata(format!("Bilinmeyen karakter: {}", ch)),
        }
    }

    fn read_string(&mut self) -> Token {
        let mut s = String::new();
        while let Some(ch) = self.advance() {
            if ch == '"' {
                return Token::Metin(s);
            }
            if ch == '\\' {
                if let Some(next) = self.advance() {
                    match next {
                        'n' => s.push('\n'),
                        'r' => s.push('\r'),
                        't' => s.push('\t'),
                        '\\' => s.push('\\'),
                        '"' => s.push('"'),
                        'x' => {
                            // Hex escape \x1b
                            let h1 = self.advance().unwrap_or('0');
                            let h2 = self.advance().unwrap_or('0');
                            let hex = format!("{}{}", h1, h2);
                            if let Ok(code) = u8::from_str_radix(&hex, 16) {
                                s.push(code as char);
                            }
                        }
                        _ => { s.push('\\'); s.push(next); }
                    }
                } else {
                    s.push('\\');
                }
            } else {
                s.push(ch);
            }
        }
        Token::Hata("Kapatılmamış metin dizisi".to_string())
    }

    fn read_number(&mut self, first_ch: char) -> Token {
        let mut s = first_ch.to_string();
        while let Some(ch) = self.peek() {
            if ch.is_ascii_digit() || ch == '.' {
                s.push(self.advance().unwrap());
            } else {
                break;
            }
        }
        match s.parse::<f64>() {
            Ok(val) => Token::Sayi(val),
            Err(_) => Token::Hata(format!("Geçersiz sayı: {}", s)),
        }
    }

    fn read_identifier(&mut self, first_ch: char) -> Token {
        let mut s = first_ch.to_string();
        while let Some(ch) = self.peek() {
            if ch.is_alphanumeric() || ch == '_' || "çğışıöüÇĞİIÖŞÜ".contains(ch) {
                s.push(self.advance().unwrap());
            } else {
                break;
            }
        }

        match s.as_str() {
            // Türkçe anahtar kelimeler (aksanlı ve aksansız formlar)
            "yazdır" | "yazdir" => Token::Yazdir,
            "eğer" | "eger" => Token::Eger,
            "yada" => Token::Yada,
            "değilse" | "degilse" => Token::Degilse,
            "döngü" | "dongu" => Token::Dongu,
            "değişken" | "degisken" => Token::Degisken,
            "fonksiyon" => Token::Fonksiyon,
            "döndür" | "dondur" => Token::Dondur,
            "ve" => Token::Ve,
            "veya" => Token::Veya,
            "değil" | "degil" => Token::Degil,
            "yükle" | "yukle" => Token::Yukle,
            "sınıf" | "sinif" => Token::Sinif,
            _ => Token::Tanimlayici(s),
        }
    }
}
