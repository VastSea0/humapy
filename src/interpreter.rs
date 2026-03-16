use crate::ast::{Ifade, Komut};
use crate::token::Token;
use std::collections::HashMap;
use std::io::{self, Write};
use std::rc::Rc;
use std::cell::RefCell;

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
    Sinif {
        ad: String,
        metotlar: HashMap<String, (Vec<String>, Vec<Komut>)>,
    },
    Nesne {
        sinif_adi: String,
        alanlar: Rc<RefCell<HashMap<String, Deger>>>,
    },
}

impl std::fmt::Display for Deger {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Deger::Sayi(n) => write!(f, "{}", n),
            Deger::Metin(s) => write!(f, "{}", s),
            Deger::Liste(l) => {
                let p: Vec<String> = l.iter().map(|d| d.to_string()).collect();
                write!(f, "[{}]", p.join(", "))
            }
            Deger::Bos => write!(f, "Boş"),
            Deger::Nesne { sinif_adi, .. } => write!(f, "<{} nesnesi>", sinif_adi),
            _ => write!(f, "<dahili>"),
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
        globals.insert("uzunluk".to_string(), Deger::DahiliFonksiyon(|args| {
            match args.first() {
                Some(Deger::Metin(s)) => Deger::Sayi(s.chars().count() as f64),
                Some(Deger::Liste(l)) => Deger::Sayi(l.len() as f64),
                _ => Deger::Sayi(0.0),
            }
        }));
        Self { global_degiskenler: globals, yerel_scopes: Vec::new(), donus_degeri: None }
    }

    pub fn yorumla(&mut self, program: Vec<Komut>) {
        for komut in program {
            self.komut_calistir(komut);
            if self.donus_degeri.is_some() { break; }
        }
    }

    fn get_degisken(&self, ad: &str) -> Deger {
        for scope in self.yerel_scopes.iter().rev() {
            if let Some(val) = scope.get(ad) { return val.clone(); }
        }
        self.global_degiskenler.get(ad).cloned().unwrap_or(Deger::Bos)
    }

    fn set_degisken(&mut self, ad: String, deger: Deger) {
        for scope in self.yerel_scopes.iter_mut().rev() {
            if scope.contains_key(&ad) { scope.insert(ad, deger); return; }
        }
        self.global_degiskenler.insert(ad, deger);
    }

    fn komut_calistir(&mut self, komut: Komut) {
        if self.donus_degeri.is_some() { return; }
        match komut {
            Komut::YazdirKomutu(ifade) => {
                let d = self.ifade_hesapla(ifade);
                println!("{}", d);
            }
            Komut::DegiskenTanimla { ad, deger } => {
                let res = self.ifade_hesapla(deger);
                self.set_degisken(ad, res);
            }
            Komut::EgerKomutu { kosul, govde, degilse_govde } => {
                let res = self.ifade_hesapla(kosul);
                if self.dogruluk_kontrolu(res) {
                    for k in govde { self.komut_calistir(k); if self.donus_degeri.is_some() { break; } }
                } else if let Some(d_govde) = degilse_govde {
                    for k in d_govde { self.komut_calistir(k); if self.donus_degeri.is_some() { break; } }
                }
            }
            Komut::DonguKomutu { kosul, govde } => {
                loop {
                    let res = self.ifade_hesapla(kosul.clone());
                    if !self.dogruluk_kontrolu(res) || self.donus_degeri.is_some() { break; }
                    for k in &govde { self.komut_calistir(k.clone()); if self.donus_degeri.is_some() { break; } }
                }
            }
            Komut::FonksiyonTanimla { ad, parametreler, govde } => {
                self.global_degiskenler.insert(ad, Deger::Fonksiyon { parametreler, govde });
            }
            Komut::SinifTanimla { ad, metotlar } => {
                let mut ms = HashMap::new();
                for m in metotlar {
                    if let Komut::FonksiyonTanimla { ad: m_ad, parametreler, govde } = m {
                        ms.insert(m_ad, (parametreler, govde));
                    }
                }
                self.global_degiskenler.insert(ad.clone(), Deger::Sinif { ad, metotlar: ms });
            }
            Komut::DondurKomutu(ifade) => {
                let val = self.ifade_hesapla(ifade);
                self.donus_degeri = Some(val);
            }
            Komut::IfadeKomutu(ifade) => {
                if let Ifade::IkiliIslem { sol, operator: Token::Esittir, sag } = ifade {
                    let d = self.ifade_hesapla(*sag);
                    match *sol {
                        Ifade::Degisken(ad) => self.set_degisken(ad, d),
                        Ifade::NesneErisim { nesne, ozellik } => {
                            let inst = self.ifade_hesapla(*nesne);
                            if let Deger::Nesne { alanlar, .. } = inst {
                                alanlar.borrow_mut().insert(ozellik, d);
                            }
                        }
                        _ => {}
                    }
                } else { self.ifade_hesapla(ifade); }
            }
            _ => {}
        }
    }

    fn ifade_hesapla(&mut self, ifade: Ifade) -> Deger {
        match ifade {
            Ifade::Sayi(n) => Deger::Sayi(n),
            Ifade::Metin(s) => Deger::Metin(s),
            Ifade::Degisken(ad) => self.get_degisken(&ad),
            Ifade::Liste(el) => Deger::Liste(el.into_iter().map(|e| self.ifade_hesapla(e)).collect()),
            Ifade::NesneErisim { nesne, ozellik } => {
                let inst = self.ifade_hesapla(*nesne);
                if let Deger::Nesne { alanlar, .. } = inst {
                    alanlar.borrow().get(&ozellik).cloned().unwrap_or(Deger::Bos)
                } else { Deger::Bos }
            }
            Ifade::Cagri { fonksiyon, argumanlar } => {
                let mut f_to_call: Option<Deger> = None;
                let mut method_instance: Option<Deger> = None;

                if let Ifade::NesneErisim { nesne, ozellik } = *fonksiyon.clone() {
                    let instance = self.ifade_hesapla(*nesne);
                    if let Deger::Nesne { ref sinif_adi, .. } = instance {
                        if let Some(Deger::Sinif { metotlar, .. }) = self.global_degiskenler.get(sinif_adi) {
                            if let Some((params, body)) = metotlar.get(&ozellik) {
                                f_to_call = Some(Deger::Fonksiyon { parametreler: params.clone(), govde: body.clone() });
                                method_instance = Some(instance.clone());
                            }
                        }
                    }
                }

                if f_to_call.is_none() {
                    f_to_call = Some(self.ifade_hesapla(*fonksiyon));
                }

                if let Some(f) = f_to_call {
                    match f {
                        Deger::Sinif { ad, .. } => {
                            Deger::Nesne { sinif_adi: ad, alanlar: Rc::new(RefCell::new(HashMap::new())) }
                        }
                        Deger::Fonksiyon { parametreler, govde } => {
                            let mut yerel = HashMap::new();
                            if let Some(ins) = method_instance { yerel.insert("bu".to_string(), ins); }
                            for (i, p) in parametreler.iter().enumerate() {
                                if i < argumanlar.len() {
                                    let arg_val = self.ifade_hesapla(argumanlar[i].clone());
                                    yerel.insert(p.clone(), arg_val);
                                }
                            }
                            self.yerel_scopes.push(yerel);
                            let eski_donus = self.donus_degeri.take();
                            for k in govde { self.komut_calistir(k); if self.donus_degeri.is_some() { break; } }
                            let res = self.donus_degeri.take().unwrap_or(Deger::Bos);
                            self.yerel_scopes.pop();
                            self.donus_degeri = eski_donus;
                            res
                        }
                        Deger::DahiliFonksiyon(df) => {
                            let args = argumanlar.into_iter().map(|a| self.ifade_hesapla(a)).collect();
                            df(args)
                        }
                        _ => Deger::Bos
                    }
                } else { Deger::Bos }
            }
            Ifade::IkiliIslem { sol, operator, sag } => {
                let l = self.ifade_hesapla(*sol);
                let r = self.ifade_hesapla(*sag);
                match operator {
                    Token::Arti => match (l, r) {
                        (Deger::Sayi(a), Deger::Sayi(b)) => Deger::Sayi(a + b),
                        (Deger::Metin(a), b) => Deger::Metin(format!("{}{}", a, b)),
                        _ => Deger::Bos
                    },
                    Token::Kucuktur => match (l, r) { (Deger::Sayi(a), Deger::Sayi(b)) => Deger::Sayi(if a < b { 1.0 } else { 0.0 }), _ => Deger::Bos },
                    _ => Deger::Bos
                }
            }
            _ => Deger::Bos
        }
    }

    fn dogruluk_kontrolu(&self, deger: Deger) -> bool {
        match deger { Deger::Sayi(n) => n != 0.0, Deger::Bos => false, _ => true }
    }
}
