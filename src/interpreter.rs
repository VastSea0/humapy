use crate::ast::{Ifade, Komut};
use crate::token::Token;
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
pub enum Deger {
    Sayi(f64),
    Metin(String),
    Bos,
    Fonksiyon {
        parametreler: Vec<String>,
        govde: Vec<Komut>,
    },
}

impl std::fmt::Display for Deger {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Deger::Sayi(n) => write!(f, "{}", n),
            Deger::Metin(s) => write!(f, "{}", s),
            Deger::Bos => write!(f, "Boş"),
            Deger::Fonksiyon { .. } => write!(f, "<fonksiyon>"),
        }
    }
}

pub struct Yorumlayici {
    global_degiskenler: HashMap<String, Deger>,
    yerel_scopes: Vec<HashMap<String, Deger>>,
    donus_degeri: Option<Deger>,
}

impl Yorumlayici {
    pub fn new() -> Self {
        Self {
            global_degiskenler: HashMap::new(),
            yerel_scopes: Vec::new(),
            donus_degeri: None,
        }
    }

    pub fn yorumla(&mut self, program: Vec<Komut>) {
        for komut in program {
            self.komut_calistir(komut);
            if self.donus_degeri.is_some() { break; }
        }
    }

    fn get_degisken(&self, ad: &str) -> Deger {
        // En son eklenen (en içteki) scope'tan başla
        for scope in self.yerel_scopes.iter().rev() {
            if let Some(val) = scope.get(ad) {
                return val.clone();
            }
        }
        self.global_degiskenler.get(ad).cloned().unwrap_or(Deger::Bos)
    }

    fn set_degisken(&mut self, ad: String, deger: Deger) {
        if let Some(scope) = self.yerel_scopes.last_mut() {
            scope.insert(ad, deger);
        } else {
            self.global_degiskenler.insert(ad, deger);
        }
    }

    fn komut_calistir(&mut self, komut: Komut) {
        if self.donus_degeri.is_some() { return; }

        match komut {
            Komut::YazdirKomutu(ifade) => {
                let deger = self.ifade_hesapla(ifade);
                println!("{}", deger);
            }
            Komut::DegiskenTanimla { ad, deger } => {
                let sonuc = self.ifade_hesapla(deger);
                self.set_degisken(ad, sonuc);
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
            Komut::DonguKomutu { kosul, govde } => {
                loop {
                    let devam_et = {
                        let sonuc = self.ifade_hesapla(kosul.clone());
                        self.dogruluk_kontrolu(sonuc)
                    };
                    if !devam_et || self.donus_degeri.is_some() { break; }

                    for k in &govde {
                        self.komut_calistir(k.clone());
                    }
                }
            }
            Komut::FonksiyonTanimla { ad, parametreler, govde } => {
                self.global_degiskenler.insert(ad, Deger::Fonksiyon { parametreler, govde });
            }
            Komut::DondurKomutu(ifade) => {
                let val = self.ifade_hesapla(ifade);
                self.donus_degeri = Some(val);
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
            Ifade::Degisken(ad) => self.get_degisken(&ad),
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
                    (Deger::Metin(a), _b) => match operator {
                        Token::Arti => Deger::Metin(format!("{}{}", a, _b)),
                        Token::EsitEsittir => Deger::Sayi(if a == _b.to_string() { 1.0 } else { 0.0 }),
                        _ => Deger::Bos,
                    },
                    (_a, Deger::Metin(b)) => match operator {
                        Token::Arti => Deger::Metin(format!("{}{}", _a, b)),
                        _ => Deger::Bos,
                    },
                    _ => Deger::Bos,
                }
            }
            Ifade::Cagri { fonksiyon, argumanlar } => {
                let f_deger = self.get_degisken(&fonksiyon);
                if let Deger::Fonksiyon { parametreler, govde } = f_deger {
                    let mut yerel_vars = HashMap::new();
                    for (i, p_ad) in parametreler.iter().enumerate() {
                        if i < argumanlar.len() {
                            let arg_val = self.ifade_hesapla(argumanlar[i].clone());
                            yerel_vars.insert(p_ad.clone(), arg_val);
                        }
                    }

                    self.yerel_scopes.push(yerel_vars);
                    let eski_donus = self.donus_degeri.take();
                    
                    for k in govde {
                        self.komut_calistir(k);
                        if self.donus_degeri.is_some() { break; }
                    }

                    let sonuc = self.donus_degeri.take().unwrap_or(Deger::Bos);
                    self.yerel_scopes.pop();
                    self.donus_degeri = eski_donus;
                    sonuc
                } else {
                    Deger::Bos
                }
            }
        }
    }

    fn dogruluk_kontrolu(&self, deger: Deger) -> bool {
        match deger {
            Deger::Sayi(n) => n != 0.0,
            Deger::Metin(s) => !s.is_empty(),
            Deger::Bos => false,
            Deger::Fonksiyon { .. } => true,
        }
    }
}
