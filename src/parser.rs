use crate::token::Token;
use crate::lexer::Lexer;
use crate::ast::{Ifade, Komut};

pub struct Parser {
    lexer: Lexer,
    current_token: Token,
    peek_token: Token,
    current_pos: (usize, usize),
}

impl Parser {
    pub fn new(mut lexer: Lexer) -> Self {
        let current_pos = lexer.get_pos();
        let current_token = lexer.next_token();
        let peek_token = lexer.next_token();
        Self {
            lexer,
            current_token,
            peek_token,
            current_pos,
        }
    }

    fn next_token(&mut self) {
        self.current_pos = self.lexer.get_pos();
        self.current_token = self.peek_token.clone();
        self.peek_token = self.lexer.next_token();
    }

    fn error(&self, msg: &str) {
        eprintln!("[Hüma Hatası] Satır {}, Sütun {}: {}", self.current_pos.0, self.current_pos.1, msg);
    }

    fn consume(&mut self, expected: Token) -> bool {
        if self.current_token == expected {
            self.next_token();
            true
        } else {
            self.error(&format!("{:?} bekleniyordu ama {:?} geldi", expected, self.current_token));
            false
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
            Token::Yukle => self.parse_yukle(),
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
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { 
            self.error("Değişken ismi bekleniyordu");
            return None; 
        };
        self.next_token();
        if !self.consume(Token::Esittir) { return None; }
        let deger = self.parse_ifade();
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::DegiskenTanimla { ad, deger })
    }

    fn parse_yazdir(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'yazdır'
        if !self.consume(Token::AcikParantez) { return None; }
        let ifade = self.parse_ifade();
        if !self.consume(Token::KapaliParantez) { return None; }
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::YazdirKomutu(ifade))
    }

    fn parse_eger(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'eğer'
        let kosul = self.parse_ifade();
        if !self.consume(Token::AcikSuskun) { return None; }
        let govde = self.parse_blok();
        let mut degilse_govde = None;
        if self.current_token == Token::Degilse {
            self.next_token(); // skip 'değilse'
            if !self.consume(Token::AcikSuskun) { return None; }
            degilse_govde = Some(self.parse_blok());
        }
        Some(Komut::EgerKomutu { kosul, govde, degilse_govde })
    }

    fn parse_dongu(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'döngü'
        let kosul = self.parse_ifade();
        if !self.consume(Token::AcikSuskun) { return None; }
        let govde = self.parse_blok();
        Some(Komut::DonguKomutu { kosul, govde })
    }

    fn parse_fonksiyon(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'fonksiyon'
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { 
            self.error("Fonksiyon ismi bekleniyordu");
            return None; 
        };
        self.next_token();
        if !self.consume(Token::AcikParantez) { return None; }
        let mut parametreler = Vec::new();
        if self.current_token != Token::KapaliParantez {
            loop {
                if let Token::Tanimlayici(ref s) = self.current_token { parametreler.push(s.clone()); }
                self.next_token();
                if self.current_token == Token::Virgul { self.next_token(); } else { break; }
            }
        }
        if !self.consume(Token::KapaliParantez) { return None; }
        if !self.consume(Token::AcikSuskun) { return None; }
        let govde = self.parse_blok();
        Some(Komut::FonksiyonTanimla { ad, parametreler, govde })
    }

    fn parse_yukle(&mut self) -> Option<Komut> {
        self.next_token(); // skip 'yükle'
        if let Token::Metin(ref s) = self.current_token {
            let yol = s.clone();
            self.next_token();
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            Some(Komut::YukleKomutu(yol))
        } else {
            self.error("Dosya yolu (metin) bekleniyordu");
            None
        }
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
        if !self.consume(Token::Esittir) { return None; }
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
        while matches!(self.current_token, Token::EsitEsittir | Token::EsitDegil) {
            let operator = self.current_token.clone();
            self.next_token();
            let sag = self.parse_karsilastirma();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_karsilastirma(&mut self) -> Ifade {
        let mut sol = self.parse_toplama();
        while matches!(self.current_token, Token::Buyuktur | Token::Kucuktur | Token::BuyukEsit | Token::KucukEsit) {
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
            Token::AcikKose => self.parse_liste(),
            _ => { 
                self.error(&format!("Beklenmeyen bir ifadeyle karşılaşıldı: {:?}", self.current_token));
                let v = Ifade::Metin("Hata".to_string()); 
                self.next_token(); 
                v 
            }
        };

        // İndeks Erişimi (Örn: liste[0])
        let mut result = node;
        while self.current_token == Token::AcikKose {
            self.next_token(); // skip '['
            let indeks = self.parse_ifade();
            self.consume(Token::KapaliKose);
            result = Ifade::ListeErisim {
                liste: Box::new(result),
                indeks: Box::new(indeks),
            };
        }

        result
    }

    fn parse_liste(&mut self) -> Ifade {
        self.next_token(); // skip '['
        let mut elemanlar = Vec::new();
        if self.current_token != Token::KapaliKose {
            loop {
                elemanlar.push(self.parse_ifade());
                if self.current_token == Token::Virgul {
                    self.next_token();
                } else {
                    break;
                }
            }
        }
        self.consume(Token::KapaliKose);
        Ifade::Liste(elemanlar)
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
