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
        Self { lexer, current_token, peek_token, current_pos }
    }

    fn next_token(&mut self) {
        self.current_pos = self.lexer.get_pos();
        self.current_token = self.peek_token.clone();
        // println!("PARSER DEBUG: token={:?}", self.current_token);
        self.peek_token = self.lexer.next_token();
    }

    fn error(&self, msg: &str) {
        eprintln!("[Hüma Hatası] Satır {}, Sütun {}: {}", self.current_pos.0, self.current_pos.1, msg);
    }

    fn consume(&mut self, expected: Token) -> bool {
        if self.current_token == expected { self.next_token(); true }
        else { self.error(&format!("{:?} bekleniyordu ama {:?} geldi", expected, self.current_token)); false }
    }

    pub fn parse_program(&mut self) -> Vec<Komut> {
        let mut komutlar = Vec::new();
        while self.current_token != Token::Son {
            if let Some(komut) = self.parse_komut() { komutlar.push(komut); }
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
            Token::Sinif => self.parse_sinif(),
            Token::Tanimlayici(_) | Token::AcikParantez | Token::AcikKose => {
                let expr = self.parse_ifade();
                if self.current_token == Token::Esittir {
                    self.next_token();
                    let deger = self.parse_ifade();
                    if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                    match expr {
                        Ifade::Degisken(ad) => Some(Komut::Atama { ad, deger }),
                        _ => Some(Komut::IfadeKomutu(Ifade::IkiliIslem { sol: Box::new(expr), operator: Token::Esittir, sag: Box::new(deger) })),
                    }
                } else {
                    if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                    Some(Komut::IfadeKomutu(expr))
                }
            }
            Token::NoktaliVirgul => { self.next_token(); None }
            _ => {
                let expr = self.parse_ifade();
                if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                Some(Komut::IfadeKomutu(expr))
            }
        }
    }

    fn parse_sinif(&mut self) -> Option<Komut> {
        self.next_token();
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { return None; };
        self.next_token();
        self.consume(Token::AcikSuskun);
        let mut metotlar = Vec::new();
        while self.current_token != Token::KapaliSuskun && self.current_token != Token::Son {
            if let Some(m) = self.parse_komut() { metotlar.push(m); }
        }
        self.consume(Token::KapaliSuskun);
        Some(Komut::SinifTanimla { ad, metotlar })
    }

    fn parse_degisken_tanimla(&mut self) -> Option<Komut> {
        self.next_token();
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { return None; };
        self.next_token();
        self.consume(Token::Esittir);
        let deger = self.parse_ifade();
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::DegiskenTanimla { ad, deger })
    }

    fn parse_yazdir(&mut self) -> Option<Komut> {
        self.next_token();
        self.consume(Token::AcikParantez);
        let ifade = self.parse_ifade();
        self.consume(Token::KapaliParantez);
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::YazdirKomutu(ifade))
    }

    fn parse_eger(&mut self) -> Option<Komut> {
        self.next_token();
        let kosul = self.parse_ifade();
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        let mut degilse_govde = None;
        if self.current_token == Token::Degilse {
            self.next_token();
            if self.current_token == Token::Eger {
                if let Some(inner_if) = self.parse_eger() {
                    degilse_govde = Some(vec![inner_if]);
                }
            } else {
                self.consume(Token::AcikSuskun);
                degilse_govde = Some(self.parse_blok());
            }
        }
        Some(Komut::EgerKomutu { kosul, govde, degilse_govde })
    }

    fn parse_dongu(&mut self) -> Option<Komut> {
        self.next_token();
        let kosul = self.parse_ifade();
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        Some(Komut::DonguKomutu { kosul, govde })
    }

    fn parse_fonksiyon(&mut self) -> Option<Komut> {
        self.next_token();
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { return None; };
        self.next_token();
        self.consume(Token::AcikParantez);
        let mut params = Vec::new();
        if self.current_token != Token::KapaliParantez {
            loop {
                if let Token::Tanimlayici(ref s) = self.current_token { params.push(s.clone()); }
                self.next_token();
                if self.current_token == Token::Virgul { self.next_token(); } else { break; }
            }
        }
        self.consume(Token::KapaliParantez);
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        Some(Komut::FonksiyonTanimla { ad, parametreler: params, govde })
    }

    fn parse_blok(&mut self) -> Vec<Komut> {
        let mut komutlar = Vec::new();
        while self.current_token != Token::KapaliSuskun && self.current_token != Token::Son {
            if let Some(komut) = self.parse_komut() { komutlar.push(komut); }
        }
        self.consume(Token::KapaliSuskun);
        komutlar
    }

    fn parse_yukle(&mut self) -> Option<Komut> {
        self.next_token();
        if let Token::Metin(ref s) = self.current_token {
            let yol = s.clone();
            self.next_token();
            Some(Komut::YukleKomutu(yol))
        } else { None }
    }

    fn parse_dondur(&mut self) -> Option<Komut> {
        self.next_token();
        let ifade = self.parse_ifade();
        Some(Komut::DondurKomutu(ifade))
    }

    pub fn parse_ifade(&mut self) -> Ifade { self.parse_veya() }

    fn parse_veya(&mut self) -> Ifade {
        let mut sol = self.parse_ve();
        while self.current_token == Token::Veya {
            let op = self.current_token.clone(); self.next_token();
            let sag = self.parse_ve();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator: op, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_ve(&mut self) -> Ifade {
        let mut sol = self.parse_esitlik();
        while self.current_token == Token::Ve {
            let op = self.current_token.clone(); self.next_token();
            let sag = self.parse_esitlik();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator: op, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_esitlik(&mut self) -> Ifade {
        let mut sol = self.parse_karsilastirma();
        while matches!(self.current_token, Token::EsitEsittir | Token::EsitDegil) {
            let op = self.current_token.clone(); self.next_token();
            let sag = self.parse_karsilastirma();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator: op, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_karsilastirma(&mut self) -> Ifade {
        let mut sol = self.parse_toplama();
        while matches!(self.current_token, Token::Buyuktur | Token::Kucuktur | Token::BuyukEsit | Token::KucukEsit) {
            let op = self.current_token.clone(); self.next_token();
            let sag = self.parse_toplama();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator: op, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_toplama(&mut self) -> Ifade {
        let mut sol = self.parse_carpma();
        while matches!(self.current_token, Token::Arti | Token::Eksi) {
            let op = self.current_token.clone(); self.next_token();
            let sag = self.parse_carpma();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator: op, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_carpma(&mut self) -> Ifade {
        let mut sol = self.parse_birincil();
        while matches!(self.current_token, Token::Carpi | Token::Bolnu | Token::Mod) {
            let op = self.current_token.clone(); self.next_token();
            let sag = self.parse_birincil();
            sol = Ifade::IkiliIslem { sol: Box::new(sol), operator: op, sag: Box::new(sag) };
        }
        sol
    }

    fn parse_birincil(&mut self) -> Ifade {
        match self.current_token {
            Token::Degil => { self.next_token(); Ifade::MantıksalDegil(Box::new(self.parse_birincil())) }
            Token::Eksi => {
                self.next_token();
                Ifade::IkiliIslem { sol: Box::new(Ifade::Sayi(0.0)), operator: Token::Eksi, sag: Box::new(self.parse_birincil()) }
            }
            _ => self.parse_temel(),
        }
    }

    fn parse_temel(&mut self) -> Ifade {
        let mut node = match self.current_token {
            Token::Sayi(n) => { self.next_token(); Ifade::Sayi(n) }
            Token::Metin(ref s) => { let v = Ifade::Metin(s.clone()); self.next_token(); v }
            Token::Tanimlayici(ref s) => { let v = Ifade::Degisken(s.clone()); self.next_token(); v }
            Token::AcikParantez => {
                self.next_token();
                let expr = self.parse_ifade();
                self.consume(Token::KapaliParantez);
                expr
            }
            Token::AcikKose => self.parse_liste(),
            _ => { self.next_token(); Ifade::Bos }
        };

        loop {
            match self.current_token {
                Token::AcikParantez => {
                    self.next_token();
                    let mut args = Vec::new();
                    if self.current_token != Token::KapaliParantez {
                        loop {
                            args.push(self.parse_ifade());
                            if self.current_token == Token::Virgul { self.next_token(); } else { break; }
                        }
                    }
                    self.consume(Token::KapaliParantez);
                    node = Ifade::Cagri { fonksiyon: Box::new(node), argumanlar: args };
                }
                Token::AcikKose => {
                    self.next_token();
                    let i = self.parse_ifade();
                    self.consume(Token::KapaliKose);
                    node = Ifade::ListeErisim { liste: Box::new(node), indeks: Box::new(i) };
                }
                Token::Nokta => {
                    self.next_token();
                    if let Token::Tanimlayici(ref s) = self.current_token {
                        let oz = s.clone(); self.next_token();
                        node = Ifade::NesneErisim { nesne: Box::new(node), ozellik: oz };
                    } else { break; }
                }
                _ => break,
            }
        }
        node
    }

    fn parse_liste(&mut self) -> Ifade {
        self.next_token();
        let mut el = Vec::new();
        if self.current_token != Token::KapaliKose {
            loop {
                el.push(self.parse_ifade());
                if self.current_token == Token::Virgul { self.next_token(); } else { break; }
            }
        }
        self.consume(Token::KapaliKose);
        Ifade::Liste(el)
    }
}
