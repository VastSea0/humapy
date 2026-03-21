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
        match self.current_token.clone() {
            // yükle "dosya.hb"
            Token::Yukle => self.parse_yukle(),

            // dene { } hata var ise { }
            Token::Dene => self.parse_dene(),

            // "metin"'i yazdır; veya ifade yazdır
            Token::Metin(_) => self.parse_ifade_veya_yazdır(),

            // Identifier-başlangıçlı komutlar:
            // isim fonksiyon olsun ... — fonksiyon tanımı
            // isim sınıf olsun ... — sınıf tanımı
            // isim liste olsun — liste oluştur
            // isim = değer olsun — değişken tanımlama
            // isim = değer — atama
            // isim(args) — fonksiyon çağrısı
            // isim'a [val] ekle — liste ekleme
            // isim'dan [idx] çıkar — liste silme
            // isim'ın uzunluğu — uzunluk ifadesi
            // ifade yazdır — postfix yazdır
            Token::Tanimlayici(_) => self.parse_tanimlayici_baslangicli(),

            // kendisi'nin alan = değer olsun
            Token::Kendisi => self.parse_kendisi_komutu(),

            // Sayı'yı yazdır vb. — sayı başlangıçlı ifade
            Token::Sayi(_) => self.parse_ifade_veya_yazdır(),

            // (ifade) yazdır vb.
            Token::AcikParantez => self.parse_ifade_veya_yazdır(),

            // [liste] yazdır vb.
            Token::AcikKose => self.parse_ifade_veya_yazdır(),

            // doğru/yanlış yazdır vb.
            Token::Dogru | Token::Yanlis => self.parse_ifade_veya_yazdır(),

            Token::Degil => self.parse_ifade_veya_yazdır(),

            Token::NoktaliVirgul => { self.next_token(); None }

            _ => {
                self.error(&format!("Beklenmeyen token: {:?}", self.current_token));
                self.next_token();
                None
            }
        }
    }

    /// Identifier ile başlayan tüm komutları parse eder
    fn parse_tanimlayici_baslangicli(&mut self) -> Option<Komut> {
        let ad = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else { return None; };

        // Peek ile sonraki token'a bak
        match self.peek_token {
            // isim fonksiyon olsun [params alsın] { gövde }
            Token::Fonksiyon => {
                self.next_token(); // identfier'ı yut
                return self.parse_fonksiyon_tanimi(ad);
            }
            // isim sınıf olsun { metotlar }
            Token::Sinif => {
                self.next_token(); // identifier'ı yut
                return self.parse_sinif_tanimi(ad);
            }
            // isim liste olsun
            Token::ListeAnahtar => {
                self.next_token(); // identifier'ı yut
                self.next_token(); // 'liste' yi yut
                self.consume(Token::Olsun);
                if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                return Some(Komut::ListeOlustur { ad });
            }
            // isim = ...
            Token::Esittir => {
                self.next_token(); // identifier'ı yut
                self.next_token(); // '=' yi yut
                return self.parse_atama_veya_tanimlama(ad);
            }
            _ => {}
        }

        // İfade olarak parse et (fonksiyon çağrısı örn. isim(args), veya isim.metot(args))
        let ifade = self.parse_ifade();

        // ifade'yi yazdır
        if self.current_token == Token::Yazdir {
            self.next_token();
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            return Some(Komut::YazdirKomutu(ifade));
        }

        // ifade'yi döndür
        if self.current_token == Token::Dondur {
            self.next_token();
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            return Some(Komut::DondurKomutu(ifade));
        }

        // ifade ise { } yoksa { }
        if self.current_token == Token::Ise {
            return self.parse_ise_komutu(ifade);
        }

        // ifade olduğu sürece { }
        if self.current_token == Token::Oldugu {
            return self.parse_oldugu_surece(ifade);
        }

        // ifade = değer olsun (nesne erişimi ataması vb.)
        if self.current_token == Token::Esittir {
            self.next_token();
            let deger = self.parse_ifade();
            if self.current_token == Token::Olsun {
                self.next_token();
            }
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            match ifade {
                Ifade::Degisken(ad) => return Some(Komut::DegiskenTanimla { ad, deger }),
                Ifade::NesneErisim { nesne, ozellik } => {
                    return Some(Komut::NesneAlaniAtama { nesne: *nesne, ozellik, deger });
                }
                Ifade::KendisiErisim { ozellik } => {
                    return Some(Komut::NesneAlaniAtama { nesne: Ifade::Degisken("kendisi".to_string()), ozellik, deger });
                }
                _ => return Some(Komut::IfadeKomutu(Ifade::IkiliIslem { sol: Box::new(ifade), operator: Token::Esittir, sag: Box::new(deger) })),
            }
        }

        // Identifier sonrası [val] + ekle → liste ekleme
        if self.current_token == Token::AcikKose {
            if let Ifade::Degisken(ref liste_ad) = ifade {
                let liste_ad = liste_ad.clone();
                self.next_token(); // '[' yut
                let deger = self.parse_ifade();
                self.consume(Token::KapaliKose);
                if self.current_token == Token::Ekle {
                    self.next_token();
                    if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                    return Some(Komut::ListeEkle { liste: liste_ad, deger });
                }
                if self.current_token == Token::Cikar {
                    self.next_token();
                    if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                    return Some(Komut::ListeCikar { liste: liste_ad, indeks: deger });
                }
                if self.current_token == Token::Yazdir {
                    self.next_token();
                    if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                    let erisim = Ifade::ListeErisim { liste: Box::new(ifade), indeks: Box::new(deger) };
                    return Some(Komut::YazdirKomutu(erisim));
                }
            }
        }

        // Uzunluğu → ifade
        if self.current_token == Token::Uzunlugu {
            self.next_token();
            let uzunluk_ifade = Ifade::Uzunluk(Box::new(ifade));
            // uzunluğu sonrası yazdır veya olduğu sürece
            if self.current_token == Token::Yazdir {
                self.next_token();
                if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                return Some(Komut::YazdirKomutu(uzunluk_ifade));
            }
            if self.current_token == Token::Oldugu {
                return self.parse_oldugu_surece(uzunluk_ifade);
            }
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            return Some(Komut::IfadeKomutu(uzunluk_ifade));
        }

        // Sadece ifade komutu
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::IfadeKomutu(ifade))
    }

    /// kendisi'nin alan = değer olsun veya kendisi'nin alan ifadesi
    fn parse_kendisi_komutu(&mut self) -> Option<Komut> {
        self.next_token(); // 'kendisi' yut

        // kendisi'nin erişimi (lexer 'nin ekini strip etmemiştir, Nin token olarak gelir ya da
        // identifier'dan sonra apostrophe+nin kalıbı)
        // Lexer'da identifier suffix olarak strip etmek yerine Nin token olarak gelmesini istedik ama
        // aslında identifier okurken geri aldık. Burada 'current_token' şu an ne?
        // Aslında lexer'da identifier'dan sonra 'nin suffix'ini geri aldık (pos restore ettik).
        // Bu yüzden burada Token::NoktaliVirgul veya başka bir şey olabilir.
        //
        // Düzeltme: kendisi anahtar kelimesi lexer'da özel olarak ele alınıyor.
        // Sonraki token apostrophe ise 'nin kontrolü yapmalıyız.
        // Ancak lexer apostrophe'u handle_apostrophe ile yönetiyor ve Nin token döndürüyor.
        // Ama identifier read_identifier'da suffix geri alınıyor.
        // kendisi bir anahtar kelime olduğu için read_identifier'dan Token::Kendisi olarak dönüyor.
        // Sonra apostrophe ayrı bir token olarak gelecek.
        // handle_apostrophe'u düzenleyelim — "nin" suffix'i Nin token olarak dönüyor.

        if self.current_token == Token::Nin {
            self.next_token(); // 'nin' yut
            let ozellik = if let Token::Tanimlayici(ref s) = self.current_token { s.clone() } else {
                self.error("kendisi'nin sonrası identifier bekleniyordu");
                return None;
            };
            self.next_token(); // özellik adını yut

            let erisim = Ifade::KendisiErisim { ozellik: ozellik.clone() };

            // kendisi'nin alan = değer olsun
            if self.current_token == Token::Esittir {
                self.next_token();
                let deger = self.parse_ifade();
                if self.current_token == Token::Olsun { self.next_token(); }
                if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                return Some(Komut::NesneAlaniAtama {
                    nesne: Ifade::Degisken("kendisi".to_string()),
                    ozellik,
                    deger,
                });
            }

            // kendisi'nin alan ifadesi olarak devam et
            let ifade = erisim;

            // kendisi'nin alan yazdır
            if self.current_token == Token::Yazdir {
                self.next_token();
                if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                return Some(Komut::YazdirKomutu(ifade));
            }

            // Diğer postfix kontrolleri
            if self.current_token == Token::Dondur {
                self.next_token();
                if self.current_token == Token::NoktaliVirgul { self.next_token(); }
                return Some(Komut::DondurKomutu(ifade));
            }

            // İfade olarak devam
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            return Some(Komut::IfadeKomutu(ifade));
        }

        // kendisi tek başına kullanılıyorsa
        let ifade = Ifade::Degisken("kendisi".to_string());
        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::IfadeKomutu(ifade))
    }

    /// isim fonksiyon olsun [param, ... alsın] { gövde }
    fn parse_fonksiyon_tanimi(&mut self, ad: String) -> Option<Komut> {
        self.consume(Token::Fonksiyon);
        self.consume(Token::Olsun);

        let mut params = Vec::new();
        // Eğer { gelmediyse, parametre listesi var
        if self.current_token != Token::AcikSuskun {
            loop {
                if let Token::Tanimlayici(ref s) = self.current_token {
                    params.push(s.clone());
                    self.next_token();
                } else {
                    break;
                }
                if self.current_token == Token::Virgul {
                    self.next_token();
                } else {
                    break;
                }
            }
            // alsın kelimesini yut
            self.consume(Token::Alsin);
        }

        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        Some(Komut::FonksiyonTanimla { ad, parametreler: params, govde })
    }

    /// isim sınıf olsun { metotlar }
    fn parse_sinif_tanimi(&mut self, ad: String) -> Option<Komut> {
        self.consume(Token::Sinif);
        self.consume(Token::Olsun);
        self.consume(Token::AcikSuskun);

        let mut metotlar = Vec::new();
        while self.current_token != Token::KapaliSuskun && self.current_token != Token::Son {
            // Sınıf içindeki metotlar: isim fonksiyon olsun ... veya değişken tanımı
            if let Some(m) = self.parse_komut() {
                metotlar.push(m);
            }
        }
        self.consume(Token::KapaliSuskun);
        Some(Komut::SinifTanimla { ad, metotlar })
    }

    /// isim = değer olsun (tanımlama) veya isim = değer (atama)
    fn parse_atama_veya_tanimlama(&mut self, ad: String) -> Option<Komut> {
        let deger = self.parse_ifade();

        if self.current_token == Token::Olsun {
            self.next_token();
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            return Some(Komut::DegiskenTanimla { ad, deger });
        }

        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::Atama { ad, deger })
    }

    /// ifade ise { gövde } [yoksa { gövde }]
    fn parse_ise_komutu(&mut self, kosul: Ifade) -> Option<Komut> {
        self.consume(Token::Ise);
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        let mut degilse_govde = None;
        if self.current_token == Token::Yoksa {
            self.next_token();
            // yoksa ifade ise { } (else if)
            if self.current_token != Token::AcikSuskun {
                let else_kosul = self.parse_ifade();
                if let Some(inner_if) = self.parse_ise_komutu(else_kosul) {
                    degilse_govde = Some(vec![inner_if]);
                }
            } else {
                self.consume(Token::AcikSuskun);
                degilse_govde = Some(self.parse_blok());
            }
        }
        Some(Komut::EgerKomutu { kosul, govde, degilse_govde })
    }

    /// ifade olduğu sürece { gövde }
    fn parse_oldugu_surece(&mut self, kosul: Ifade) -> Option<Komut> {
        self.consume(Token::Oldugu);
        self.consume(Token::Surece);
        self.consume(Token::AcikSuskun);
        let govde = self.parse_blok();
        Some(Komut::DonguKomutu { kosul, govde })
    }

    /// İfade oku, sonra yazdır/döndür/ise/olduğu sürece kontrolü
    fn parse_ifade_veya_yazdır(&mut self) -> Option<Komut> {
        let ifade = self.parse_ifade();

        // Postfix yazdır
        if self.current_token == Token::Yazdir {
            self.next_token();
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            return Some(Komut::YazdirKomutu(ifade));
        }

        // Postfix döndür
        if self.current_token == Token::Dondur {
            self.next_token();
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            return Some(Komut::DondurKomutu(ifade));
        }

        // ifade ise { gövde } yoksa { gövde }
        if self.current_token == Token::Ise {
            return self.parse_ise_komutu(ifade);
        }

        // ifade olduğu sürece { gövde }
        if self.current_token == Token::Oldugu {
            return self.parse_oldugu_surece(ifade);
        }

        // ifade = değer olsun
        if self.current_token == Token::Esittir {
            self.next_token();
            let deger = self.parse_ifade();
            if self.current_token == Token::Olsun { self.next_token(); }
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            match ifade {
                Ifade::Degisken(ad) => return Some(Komut::DegiskenTanimla { ad, deger }),
                Ifade::NesneErisim { nesne, ozellik } => {
                    return Some(Komut::NesneAlaniAtama { nesne: *nesne, ozellik, deger });
                }
                _ => return Some(Komut::IfadeKomutu(Ifade::IkiliIslem { sol: Box::new(ifade), operator: Token::Esittir, sag: Box::new(deger) })),
            }
        }

        if self.current_token == Token::NoktaliVirgul { self.next_token(); }
        Some(Komut::IfadeKomutu(ifade))
    }

    /// dene { } hata var ise { }
    fn parse_dene(&mut self) -> Option<Komut> {
        self.consume(Token::Dene);
        self.consume(Token::AcikSuskun);
        let dene_govde = self.parse_blok();
        self.consume(Token::HataAnahtar);
        self.consume(Token::Var);
        self.consume(Token::Ise);
        self.consume(Token::AcikSuskun);
        let hata_govde = self.parse_blok();
        Some(Komut::DeneKomutu { dene_govde, hata_govde })
    }

    fn parse_yukle(&mut self) -> Option<Komut> {
        self.next_token();
        if let Token::Metin(ref s) = self.current_token {
            let yol = s.clone();
            self.next_token();
            if self.current_token == Token::NoktaliVirgul { self.next_token(); }
            Some(Komut::YukleKomutu(yol))
        } else { None }
    }

    fn parse_blok(&mut self) -> Vec<Komut> {
        let mut komutlar = Vec::new();
        while self.current_token != Token::KapaliSuskun && self.current_token != Token::Son {
            if let Some(komut) = self.parse_komut() { komutlar.push(komut); }
        }
        self.consume(Token::KapaliSuskun);
        komutlar
    }

    // ─── İfade Ayrıştırma (Expression Parsing) ─────────────────────

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
        while self.current_token == Token::Esittir || self.current_token == Token::EsitEsittir || self.current_token == Token::EsitDegil {
            // Spec'e göre: `=` koşulda eşitlik kontrolü yapar
            let op = self.current_token.clone(); self.next_token();

            // İfade parse et, ama "ise" ile bitemeli — peek yaparak kontrol et
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
        let mut node = match self.current_token.clone() {
            Token::Sayi(n) => { self.next_token(); Ifade::Sayi(n) }
            Token::Metin(ref s) => { let v = Ifade::Metin(s.clone()); self.next_token(); v }
            Token::Tanimlayici(ref s) => {
                let v = Ifade::Degisken(s.clone());
                self.next_token();
                v
            }
            Token::Dogru => { self.next_token(); Ifade::Dogru }
            Token::Yanlis => { self.next_token(); Ifade::Yanlis }
            Token::Kendisi => {
                self.next_token();
                // kendisi'nin erişimi
                if self.current_token == Token::Nin {
                    self.next_token();
                    if let Token::Tanimlayici(ref s) = self.current_token {
                        let oz = s.clone();
                        self.next_token();
                        Ifade::KendisiErisim { ozellik: oz }
                    } else {
                        Ifade::Degisken("kendisi".to_string())
                    }
                } else {
                    Ifade::Degisken("kendisi".to_string())
                }
            }
            Token::AcikParantez => {
                self.next_token();
                let expr = self.parse_ifade();
                self.consume(Token::KapaliParantez);
                expr
            }
            Token::AcikKose => self.parse_liste(),
            _ => { self.next_token(); Ifade::Bos }
        };

        // Postfix operatörler: fonksiyon çağrısı, liste erişimi, nokta erişimi
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
                Token::Nin => {
                    self.next_token();
                    // identifier'nin uzunluğu
                    if self.current_token == Token::Uzunlugu {
                        self.next_token();
                        node = Ifade::Uzunluk(Box::new(node));
                    } else if let Token::Tanimlayici(ref s) = self.current_token {
                        let oz = s.clone(); self.next_token();
                        node = Ifade::NesneErisim { nesne: Box::new(node), ozellik: oz };
                    } else {
                        break;
                    }
                }
                Token::Uzunlugu => {
                    self.next_token();
                    node = Ifade::Uzunluk(Box::new(node));
                }
                _ => break,
            }
        }
        node
    }

    fn parse_liste(&mut self) -> Ifade {
        self.next_token(); // '[' yut
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
