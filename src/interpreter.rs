use crate::ast::{Ifade, Komut};
use crate::token::Token;
use crate::value::Deger;
use std::collections::{HashMap, HashSet};
use std::io::{self, Write};
use std::rc::Rc;
use std::cell::RefCell;
use std::path::Path;
use std::time::{SystemTime, UNIX_EPOCH};
use std::thread;
use std::time::Duration;

pub struct Yorumlayici {
    global_degiskenler: HashMap<String, Deger>,
    yerel_scopes: Vec<HashMap<String, Deger>>,
    donus_degeri: Option<Deger>,
    yuklenen_dosyalar: HashSet<String>,
    arama_yolları: Vec<String>,
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
        globals.insert("oku".to_string(), Deger::DahiliFonksiyon(|args| {
            if let Some(msg) = args.first() { print!("{}", msg); let _ = io::stdout().flush(); }
            let mut input = String::new();
            if io::stdin().read_line(&mut input).is_ok() { Deger::Metin(input.trim().to_string()) } else { Deger::Bos }
        }));
        globals.insert("uyut".to_string(), Deger::DahiliFonksiyon(|args| {
            if let Some(Deger::Sayi(ms)) = args.first() { if *ms > 0.0 { thread::sleep(Duration::from_millis(*ms as u64)); } }
            Deger::Bos
        }));
        globals.insert("zaman".to_string(), Deger::DahiliFonksiyon(|_| {
            Deger::Sayi(SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs_f64())
        }));
        globals.insert("listeye_ekle".to_string(), Deger::DahiliFonksiyon(|args| {
            if args.len() >= 2 {
                if let Deger::Liste(l) = &args[0] {
                    let mut yeni = l.clone(); yeni.push(args[1].clone());
                    return Deger::Liste(yeni);
                }
            }
            Deger::Bos
        }));
        Self { 
            global_degiskenler: globals, 
            yerel_scopes: Vec::new(), 
            donus_degeri: None, 
            yuklenen_dosyalar: HashSet::new(), 
            arama_yolları: vec![".".to_string(), "./lib".to_string()],
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
            if let Some(val) = scope.get(ad) { return val.clone(); }
        }
        self.global_degiskenler.get(ad).cloned().unwrap_or(Deger::Bos)
    }

    fn degisken_ata(&mut self, ad: String, deger: Deger) {
        for scope in self.yerel_scopes.iter_mut().rev() {
            if scope.contains_key(&ad) { scope.insert(ad, deger); return; }
        }
        self.global_degiskenler.insert(ad, deger);
    }

    fn degisken_tanimla(&mut self, ad: String, deger: Deger) {
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
                let d = self.ifade_hesapla(ifade);
                println!("{}", d);
            }
            Komut::DegiskenTanimla { ad, deger } => {
                let res = self.ifade_hesapla(deger);
                self.degisken_tanimla(ad, res);
            }
            Komut::EgerKomutu { kosul, govde, degilse_govde } => {
                let r = self.ifade_hesapla(kosul);
                if self.dogruluk_kontrolu(r) {
                    for k in govde { self.komut_calistir(k); if self.donus_degeri.is_some() { break; } }
                } else if let Some(d) = degilse_govde {
                    for k in d { self.komut_calistir(k); if self.donus_degeri.is_some() { break; } }
                }
            }
            Komut::DonguKomutu { kosul, govde } => {
                loop {
                    let r = self.ifade_hesapla(kosul.clone());
                    if !self.dogruluk_kontrolu(r) || self.donus_degeri.is_some() { break; }
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
                let v = self.ifade_hesapla(ifade);
                self.donus_degeri = Some(v);
            }
            Komut::YukleKomutu(yol) => self.modül_yükle(&yol),
            Komut::IfadeKomutu(ifade) => {
                if let Ifade::IkiliIslem { sol, operator: Token::Esittir, sag } = ifade {
                    let d = self.ifade_hesapla(*sag);
                    match *sol {
                        Ifade::Degisken(ad) => self.degisken_ata(ad, d),
                        Ifade::NesneErisim { nesne, ozellik } => {
                            if let Deger::Nesne { alanlar, .. } = self.ifade_hesapla(*nesne) {
                                alanlar.borrow_mut().insert(ozellik, d);
                            }
                        }
                        Ifade::ListeErisim { liste, indeks } => {
                            let l_val = self.ifade_hesapla((*liste).clone());
                            let i_val = self.ifade_hesapla(*indeks);
                            if let (Deger::Liste(mut l), Deger::Sayi(i)) = (l_val, i_val) {
                                let idx = i as usize;
                                if idx < l.len() {
                                    l[idx] = d;
                                    if let Ifade::Degisken(ad) = *liste {
                                        self.degisken_ata(ad, Deger::Liste(l));
                                    }
                                }
                            }
                        }
                        _ => {}
                    }
                } else { self.ifade_hesapla(ifade); }
            }
        }
    }

    fn modül_yükle(&mut self, dosya_adı: &str) {
        let mut bulundu = None;
        for temel in &self.arama_yolları {
            let tam_yol = format!("{}/{}", temel, dosya_adı);
            if Path::new(&tam_yol).exists() { bulundu = Some(tam_yol); break; }
        }
        if let Some(yol) = bulundu {
            if self.yuklenen_dosyalar.contains(&yol) { return; }
            self.yuklenen_dosyalar.insert(yol.clone());
            if let Ok(icerik) = std::fs::read_to_string(&yol) {
                let mut parser = crate::parser::Parser::new(crate::lexer::Lexer::new(&icerik));
                let prog = parser.parse_program();
                let eski = self.donus_degeri.take();
                self.yorumla(prog);
                self.donus_degeri = eski;
            }
        } else {
            eprintln!("[Hüma Hatası] Modül bulunamadı: {}", dosya_adı);
        }
    }

    fn ifade_hesapla(&mut self, ifade: Ifade) -> Deger {
        match ifade {
            Ifade::Sayi(n) => Deger::Sayi(n),
            Ifade::Metin(s) => Deger::Metin(s),
            Ifade::Bos => Deger::Bos,
            Ifade::Degisken(ad) => self.get_degisken(&ad),
            Ifade::Liste(el) => Deger::Liste(el.into_iter().map(|e| self.ifade_hesapla(e)).collect()),
            Ifade::ListeErisim { liste, indeks } => {
                let l_val = self.ifade_hesapla(*liste);
                let i_val = self.ifade_hesapla(*indeks);
                match (l_val, i_val) {
                    (Deger::Liste(l), Deger::Sayi(i)) => l.get(i as usize).cloned().unwrap_or(Deger::Bos),
                    (Deger::Metin(s), Deger::Sayi(i)) => s.chars().nth(i as usize).map(|c| Deger::Metin(c.to_string())).unwrap_or(Deger::Bos),
                    _ => Deger::Bos
                }
            }
            Ifade::NesneErisim { nesne, ozellik } => {
                let inst = self.ifade_hesapla(*nesne);
                if let Deger::Nesne { alanlar, .. } = inst { alanlar.borrow().get(&ozellik).cloned().unwrap_or(Deger::Bos) }
                else { Deger::Bos }
            }
            Ifade::Cagri { fonksiyon, argumanlar } => {
                let mut f_to_call = None;
                let mut method_instance = None;
                if let Ifade::NesneErisim { nesne, ozellik } = *fonksiyon.clone() {
                    let instance = self.ifade_hesapla(*nesne);
                    if let Deger::Nesne { ref sinif_adi, .. } = instance {
                        if let Some(Deger::Sinif { metotlar, .. }) = self.global_degiskenler.get(sinif_adi) {
                            if let Some((ps, bd)) = metotlar.get(&ozellik) {
                                f_to_call = Some(Deger::Fonksiyon { parametreler: ps.clone(), govde: bd.clone() });
                                method_instance = Some(instance.clone());
                            }
                        }
                    }
                }
                if f_to_call.is_none() { f_to_call = Some(self.ifade_hesapla(*fonksiyon)); }
                if let Some(f) = f_to_call {
                    match f {
                        Deger::Sinif { ad, .. } => Deger::Nesne { sinif_adi: ad, alanlar: Rc::new(RefCell::new(HashMap::new())) },
                        Deger::Fonksiyon { parametreler, govde } => {
                            let mut yerel = HashMap::new();
                            if let Some(ins) = method_instance { yerel.insert("bu".to_string(), ins); }
                            for (i, p) in parametreler.iter().enumerate() {
                                if i < argumanlar.len() {
                                    let v = self.ifade_hesapla(argumanlar[i].clone());
                                    yerel.insert(p.clone(), v);
                                }
                            }
                            self.yerel_scopes.push(yerel);
                            let eski = self.donus_degeri.take();
                            for k in govde { self.komut_calistir(k); if self.donus_degeri.is_some() { break; } }
                            let res = self.donus_degeri.take().unwrap_or(Deger::Bos);
                            self.yerel_scopes.pop(); self.donus_degeri = eski; res
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
                    Token::Ve => Deger::Sayi(if self.dogruluk_kontrolu(l) && self.dogruluk_kontrolu(r) { 1.0 } else { 0.0 }),
                    Token::Veya => Deger::Sayi(if self.dogruluk_kontrolu(l) || self.dogruluk_kontrolu(r) { 1.0 } else { 0.0 }),
                    _ => match (l, r) {
                        (Deger::Sayi(a), Deger::Sayi(b)) => match operator {
                            Token::Arti => Deger::Sayi(a + b),
                            Token::Eksi => Deger::Sayi(a - b),
                            Token::Carpi => Deger::Sayi(a * b),
                            Token::Bolnu => Deger::Sayi(a / b),
                            Token::Kucuktur => Deger::Sayi(if a < b { 1.0 } else { 0.0 }),
                            Token::Buyuktur => Deger::Sayi(if a > b { 1.0 } else { 0.0 }),
                            Token::KucukEsit => Deger::Sayi(if a <= b { 1.0 } else { 0.0 }),
                            Token::BuyukEsit => Deger::Sayi(if a >= b { 1.0 } else { 0.0 }),
                            Token::EsitEsittir => Deger::Sayi(if a == b { 1.0 } else { 0.0 }),
                            Token::EsitDegil => Deger::Sayi(if a != b { 1.0 } else { 0.0 }),
                            _ => Deger::Bos
                        },
                        (Deger::Metin(a), b) => match operator {
                            Token::Arti => Deger::Metin(format!("{}{}", a, b)),
                            _ => Deger::Bos
                        },
                        (a, b) => match operator {
                            Token::EsitEsittir => Deger::Sayi(if a == b { 1.0 } else { 0.0 }),
                            Token::EsitDegil => Deger::Sayi(if a != b { 1.0 } else { 0.0 }),
                            _ => Deger::Bos
                        }
                    }
                }
            }
            Ifade::MantıksalDegil(i) => {
                let v = self.ifade_hesapla(*i);
                Deger::Sayi(if self.dogruluk_kontrolu(v) { 0.0 } else { 1.0 })
            }
            _ => Deger::Bos
        }
    }

    fn dogruluk_kontrolu(&self, deger: Deger) -> bool {
        match deger {
            Deger::Sayi(n) => n != 0.0,
            Deger::Metin(s) => !s.is_empty(),
            Deger::Liste(l) => !l.is_empty(),
            Deger::Bos => false,
            _ => true
        }
    }
}
