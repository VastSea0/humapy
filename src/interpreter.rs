use crate::ast::{Ifade, Komut};
use crate::token::Token;
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq)]
pub enum Deger {
    Sayi(f64),
    Metin(String),
    Liste(Vec<Deger>),
    Bos,
    Fonksiyon {
        parametreler: Vec<String>,
        govde: Vec<Komut>,
    },
    DahiliFonksiyon(fn(Vec<Deger>) -> Deger),
}

impl std::fmt::Display for Deger {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Deger::Sayi(n) => write!(f, "{}", n),
            Deger::Metin(s) => write!(f, "{}", s),
            Deger::Liste(l) => {
                let parts: Vec<String> = l.iter().map(|d| d.to_string()).collect();
                write!(f, "[{}]", parts.join(", "))
            }
            Deger::Bos => write!(f, "Boş"),
            Deger::Fonksiyon { .. } => write!(f, "<fonksiyon>"),
            Deger::DahiliFonksiyon(_) => write!(f, "<dahili fonksiyon>"),
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
        let mut globals = HashMap::new();
        
        // Dahili Fonksiyonlar
        globals.insert("uzunluk".to_string(), Deger::DahiliFonksiyon(|args| {
            if let Some(arg) = args.first() {
                match arg {
                    Deger::Metin(s) => Deger::Sayi(s.chars().count() as f64),
                    Deger::Liste(l) => Deger::Sayi(l.len() as f64),
                    _ => Deger::Sayi(0.0),
                }
            } else {
                Deger::Sayi(0.0)
            }
        }));

        Self {
            global_degiskenler: globals,
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
            Ifade::Liste(elemanlar) => {
                let mut degerler = Vec::new();
                for e in elemanlar {
                    degerler.push(self.ifade_hesapla(e));
                }
                Deger::Liste(degerler)
            }
            Ifade::ListeErisim { liste, indeks } => {
                let l_val = self.ifade_hesapla(*liste);
                let i_val = self.ifade_hesapla(*indeks);
                match (l_val, i_val) {
                    (Deger::Liste(l), Deger::Sayi(i)) => {
                        let idx = i as usize;
                        l.get(idx).cloned().unwrap_or(Deger::Bos)
                    }
                    (Deger::Metin(s), Deger::Sayi(i)) => {
                        let idx = i as usize;
                        s.chars().nth(idx).map(|c| Deger::Metin(c.to_string())).unwrap_or(Deger::Bos)
                    }
                    _ => Deger::Bos
                }
            }
            Ifade::IkiliIslem { sol, operator, sag } => {
                let sol_v = self.ifade_hesapla(*sol);
                let sag_v = self.ifade_hesapla(*sag);

                match operator {
                    Token::Ve => Deger::Sayi(if self.dogruluk_kontrolu(sol_v) && self.dogruluk_kontrolu(sag_v) { 1.0 } else { 0.0 }),
                    Token::Veya => Deger::Sayi(if self.dogruluk_kontrolu(sol_v) || self.dogruluk_kontrolu(sag_v) { 1.0 } else { 0.0 }),
                    _ => match (sol_v, sag_v) {
                        (Deger::Sayi(a), Deger::Sayi(b)) => match operator {
                            Token::Arti => Deger::Sayi(a + b),
                            Token::Eksi => Deger::Sayi(a - b),
                            Token::Carpi => Deger::Sayi(a * b),
                            Token::Bolnu => Deger::Sayi(a / b),
                            Token::Buyuktur => Deger::Sayi(if a > b { 1.0 } else { 0.0 }),
                            Token::Kucuktur => Deger::Sayi(if a < b { 1.0 } else { 0.0 }),
                            Token::BuyukEsit => Deger::Sayi(if a >= b { 1.0 } else { 0.0 }),
                            Token::KucukEsit => Deger::Sayi(if a <= b { 1.0 } else { 0.0 }),
                            Token::EsitEsittir => Deger::Sayi(if a == b { 1.0 } else { 0.0 }),
                            Token::EsitDegil => Deger::Sayi(if a != b { 1.0 } else { 0.0 }),
                            _ => Deger::Bos,
                        },
                        (Deger::Metin(a), b) => match operator {
                            Token::Arti => Deger::Metin(format!("{}{}", a, b)),
                            Token::EsitEsittir => Deger::Sayi(if a == b.to_string() { 1.0 } else { 0.0 }),
                            Token::EsitDegil => Deger::Sayi(if a != b.to_string() { 1.0 } else { 0.0 }),
                            _ => Deger::Bos,
                        },
                        (a, Deger::Metin(b)) => match operator {
                            Token::Arti => Deger::Metin(format!("{}{}", a, b)),
                            _ => Deger::Bos,
                        },
                        _ => Deger::Bos,
                    }
                }
            }
            Ifade::MantıksalDegil(ifade) => {
                let sonuc = self.ifade_hesapla(*ifade);
                Deger::Sayi(if self.dogruluk_kontrolu(sonuc) { 0.0 } else { 1.0 })
            }
            Ifade::Cagri { fonksiyon, argumanlar } => {
                let f_deger = self.get_degisken(&fonksiyon);
                match f_deger {
                    Deger::Fonksiyon { parametreler, govde } => {
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
                    }
                    Deger::DahiliFonksiyon(f) => {
                        let mut args = Vec::new();
                        for a in argumanlar {
                            args.push(self.ifade_hesapla(a));
                        }
                        f(args)
                    }
                    _ => Deger::Bos
                }
            }
        }
    }

    fn dogruluk_kontrolu(&self, deger: Deger) -> bool {
        match deger {
            Deger::Sayi(n) => n != 0.0,
            Deger::Metin(s) => !s.is_empty(),
            Deger::Liste(l) => !l.is_empty(),
            Deger::Bos => false,
            Deger::Fonksiyon { .. } => true,
            Deger::DahiliFonksiyon(_) => true,
        }
    }
}
