use crate::ast::{Ifade, Komut};
use crate::token::Token;
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
pub enum Deger {
    Sayi(f64),
    Metin(String),
    Bos,
}

impl std::fmt::Display for Deger {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Deger::Sayi(n) => write!(f, "{}", n),
            Deger::Metin(s) => write!(f, "{}", s),
            Deger::Bos => write!(f, ""),
        }
    }
}

pub struct Yorumlayici {
    degiskenler: HashMap<String, Deger>,
}

impl Yorumlayici {
    pub fn new() -> Self {
        Self {
            degiskenler: HashMap::new(),
        }
    }

    pub fn yorumla(&mut self, program: Vec<Komut>) {
        for komut in program {
            self.komut_calistir(komut);
        }
    }

    fn komut_calistir(&mut self, komut: Komut) {
        match komut {
            Komut::YazdirKomutu(ifade) => {
                let deger = self.ifade_hesapla(ifade);
                println!("{}", deger);
            }
            Komut::DegiskenTanimla { ad, deger } => {
                let sonuc = self.ifade_hesapla(deger);
                self.degiskenler.insert(ad, sonuc);
            }
            Komut::EgerKomutu { kosul, govde, degilse_govde } => {
                let sonuc = self.ifade_hesapla(kosul);
                if self.dogruluk_kontrolu(sonuc) {
                    for k in govde {
                        self.komut_calistir(k);
                    }
                } else if let Some(d_govde) = degilse_govde {
                    for k in d_govde {
                        self.komut_calistir(k);
                    }
                }
            }
            Komut::IfadeKomutu(ifade) => {
                self.ifade_hesapla(ifade);
            }
        }
    }

    fn ifade_hesapla(&mut self, ifade: Ifade) -> Deger {
        match ifade {
            Ifade::Sayi(n) => Deger::Sayi(n),
            Ifade::Metin(s) => Deger::Metin(s),
            Ifade::Degisken(ad) => {
                self.degiskenler.get(&ad).cloned().unwrap_or(Deger::Bos)
            }
            Ifade::IkiliIslem { sol, operator, sag } => {
                let sol_deger = self.ifade_hesapla(*sol);
                let sag_deger = self.ifade_hesapla(*sag);

                match (sol_deger, sag_deger) {
                    (Deger::Sayi(a), Deger::Sayi(b)) => match operator {
                        Token::Arti => Deger::Sayi(a + b),
                        Token::Eksi => Deger::Sayi(a - b),
                        Token::Carpi => Deger::Sayi(a * b),
                        Token::Bolnu => Deger::Sayi(a / b),
                        Token::Buyuktur => Deger::Sayi(if a > b { 1.0 } else { 0.0 }),
                        Token::Kucuktur => Deger::Sayi(if a < b { 1.0 } else { 0.0 }),
                        Token::EsitEsittir => Deger::Sayi(if a == b { 1.0 } else { 0.0 }),
                        _ => Deger::Bos,
                    },
                    (Deger::Metin(a), Deger::Metin(b)) => match operator {
                        Token::Arti => Deger::Metin(format!("{}{}", a, b)),
                        Token::EsitEsittir => Deger::Sayi(if a == b { 1.0 } else { 0.0 }),
                        _ => Deger::Bos,
                    },
                    (Deger::Metin(a), Deger::Sayi(b)) => match operator {
                        Token::Arti => Deger::Metin(format!("{}{}", a, b)),
                        _ => Deger::Bos,
                    },
                    (Deger::Sayi(a), Deger::Metin(b)) => match operator {
                        Token::Arti => Deger::Metin(format!("{}{}", a, b)),
                        _ => Deger::Bos,
                    },
                    _ => Deger::Bos,
                }
            }
            Ifade::Cagri { .. } => Deger::Bos,
        }
    }

    fn dogruluk_kontrolu(&self, deger: Deger) -> bool {
        match deger {
            Deger::Sayi(n) => n != 0.0,
            Deger::Metin(s) => !s.is_empty(),
            Deger::Bos => false,
        }
    }
}
