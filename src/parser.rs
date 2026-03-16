use crate::token::Token;
use crate::lexer::Lexer;
use crate::ast::{Ifade, Komut};

pub struct Parser {
    lexer: Lexer,
    current_token: Token,
    peek_token: Token,
}

impl Parser {
    pub fn new(mut lexer: Lexer) -> Self {
        let current_token = lexer.next_token();
        let peek_token = lexer.next_token();
        Self {
            lexer,
            current_token,
            peek_token,
        }
    }

    fn next_token(&mut self) {
        self.current_token = self.peek_token.clone();
        self.peek_token = self.lexer.next_token();
    }

    fn consume(&mut self, expected: Token) {
        if self.current_token == expected {
            self.next_token();
        } else {
            // Sessiz hata (iyileştirilebilir)
        }
    }

    pub fn parse_program(&mut self) -> Vec<Komut> {
        let mut komutlar = Vec::new();
        while self.current_token != Token::Son {
            if let Some(komut) = self.parse_komut() {
                komutlar.push(komut);
            } else if self.current_token != Token::Son {
                self.next_token();
            }
        }
        komutlar
    }

    fn parse_komut(&mut self) -> Option<Komut> {
        match self.current_token {
            Token::Degisken => self.parse_degisken_tanimla(),
            Token::Yazdir => self.parse_yazdir(),
            Token::Eger => self.parse_eger(),
            Token::Dongu => self.parse_dongu(),
            Token::Fonksiyon => self.parse_fonksiyon(),
            Token::Dondur => self.parse_dondur(),
            Token::Tanimlayici(_) => {
                if self.peek_token == Token::Esittir {
                    self.parse_atama()
                } else if self.peek_token == Token::AcikParantez {
                    Some(Komut::IfadeKomutu(self.parse_cagri()))
                } else {
                    Some(Komut::IfadeKomutu(self.parse_ifade()))
                }
            }
            Token::NoktaliVirgul => {
                self.next_token();
                None
            }
            _ => {
                let expr = self.parse_ifade();
                Some(Komut::IfadeKomutu(expr))
            }
        }
    }

    fn parse_degisken_tanimla(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'değişken'
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { return None; };
        self.next_token();
        self.consume(Token::Esittir);
        let deger = self.parse_ifade();
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::DegiskenTanimla { ad, deger })
    }

    fn parse_yazdir(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'yazdır'
        self.consume(Token::AcikParantez);
        let ifade = self.parse_ifade();
        self.consume(Token::KapaliParantez);
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::YazdirKomutu(ifade))
    }

    fn parse_eger(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'eğer'
        let kosul = self.parse_ifade();
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        let mut degilse_govde = None;
        if self.current_token == Token::Degilse {
            self.next_token(); // skip 'değilse'
            self.consume(Token::AcikSuskun);
            degilse_govde = Some(self.parse_blok());
        }
        Some(Komut::EgerKomutu { kosul, govde, degilse_govde })
    }

    fn parse_dongu(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'döngü'
        let kosul = self.parse_ifade();
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        Some(Komut::DonguKomutu { kosul, govde })
    }

    fn parse_fonksiyon(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'fonksiyon'
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { return None; };
        self.next_token();
        self.consume(Token::AcikParantez);
        let mut parametreler = Vec::new();
        if self.current_token != Token::KapaliParantez {
            loop {
                if let Token::Tanimlayici(ref s) = self.current_token { parametreler.push(s.clone()); }
                self.next_token();
                if self.current_token == Token::Virgul { self.next_token(); } else { break; }
            }
        }
        self.consume(Token::KapaliParantez);
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        Some(Komut::FonksiyonTanimla { ad, parametreler, govde })
    }

    fn parse_dondur(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'döndür'
        let ifade = self.parse_ifade();
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::DondurKomutu(ifade))
    }

    fn parse_atama(&mut self) -> Option<Komut> {
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { return None; };
        self.next_token();
        self.consume(Token::Esittir);
        let deger = self.parse_ifade();
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::DegiskenTanimla { ad, deger })
    }

    fn parse_blok(&mut self) -> Vec<Komut> {
        let mut komutlar = Vec::new();
        while self.current_token != Token::KapaliSuskun && self.current_token != Token::Son {
            if let Some(komut) = self.parse_komut() {
                komutlar.push(komut);
            }
        }
        self.consume(Token::KapaliSuskun);
        komutlar
    }

    // İfade Katmanları (Precedence)
    pub fn parse_ifade(&mut self) -> Ifade {
        self.parse_veya()
    }

    fn parse_veya(&mut self) -> Ifade {
        let mut sol = self.parse_ve();
        while self.current_token == Token::Veya {
            let operator = self.current_token.clone();
            self.next_token();
            let sag = self.parse_ve();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_ve(&mut self) -> Ifade {
        let mut sol = self.parse_esitlik();
        while self.current_token == Token::Ve {
            let operator = self.current_token.clone();
            self.next_token();
            let sag = self.parse_esitlik();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_esitlik(&mut self) -> Ifade {
        let mut sol = self.parse_karsilastirma();
        while self.current_token == Token::EsitEsittir {
            let operator = self.current_token.clone();
            self.next_token();
            let sag = self.parse_karsilastirma();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_karsilastirma(&mut self) -> Ifade {
        let mut sol = self.parse_toplama();
        while matches!(self.current_token, Token::Buyuktur | Token::Kucuktur) {
            let operator = self.current_token.clone();
            self.next_token();
            let sag = self.parse_toplama();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_toplama(&mut self) -> Ifade {
        let mut sol = self.parse_carpma();
        while matches!(self.current_token, Token::Arti | Token::Eksi) {
            let operator = self.current_token.clone();
            self.next_token();
            let sag = self.parse_carpma();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_carpma(&mut self) -> Ifade {
        let mut sol = self.parse_birincil();
        while matches!(self.current_token, Token::Carpi | Token::Bolnu) {
            let operator = self.current_token.clone();
            self.next_token();
            let sag = self.parse_birincil();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_birincil(&mut self) -> Ifade {
        match self.current_token {
            Token::Degil => {
                self.next_token();
                Ifade::MantıksalDegil(Box::new(self.parse_birincil()))
            }
            _ => self.parse_temel(),
        }
    }

    fn parse_temel(&mut self) -> Ifade {
        let node = match self.current_token {
            Token::Sayi(n) => { self.next_token(); Ifade::Sayi(n) }
            Token::Metin(ref s) => { let v = Ifade::Metin(s.clone()); self.next_token(); v }
            Token::Tanimlayici(ref s) => {
                if self.peek_token == Token::AcikParantez {
                    self.parse_cagri()
                } else {
                    let v = Ifade::Degisken(s.clone());
                    self.next_token();
                    v
                }
            }
            Token::AcikParantez => {
                self.next_token(); // (
                let expr = self.parse_ifade();
                self.consume(Token::KapaliParantez);
                expr
            }
            _ => { let v = Ifade::Metin(format!("Hata: {:?}", self.current_token)); self.next_token(); v }
        };
        node
    }

    fn parse_cagri(&mut self) -> Ifade {
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { "".to_string() };
        self.next_token();
        self.consume(Token::AcikParantez);
        let mut argumanlar = Vec::new();
        if self.current_token != Token::KapaliParantez {
            loop {
                argumanlar.push(self.parse_ifade());
                if self.current_token == Token::Virgul { self.next_token(); } else { break; }
            }
        }
        self.consume(Token::KapaliParantez);
        Ifade::Cagri { fonksiyon: ad, argumanlar }
    }
}
