use crate::token::Token;

#[derive(Debug, Clone, PartialEq)]
pub enum Ifade {
    Bos,
    Sayi(f64),
    Metin(String),
    Degisken(String),
    IkiliIslem {
        sol: Box<Ifade>,
        operator: Token,
        sag: Box<Ifade>,
    },
    MantıksalDegil(Box<Ifade>),
    Liste(Vec<Ifade>),
    ListeErisim {
        liste: Box<Ifade>,
        indeks: Box<Ifade>,
    },
    NesneErisim {
        nesne: Box<Ifade>,
        ozellik: String,
    },
    NesneOlustur {
        sinif_adi: String,
        argumanlar: Vec<Ifade>,
    },
    Cagri {
        fonksiyon: Box<Ifade>,
        argumanlar: Vec<Ifade>,
    },
}

#[derive(Debug, Clone, PartialEq)]
pub enum Komut {
    DegiskenTanimla {
        ad: String,
        deger: Ifade,
    },
    Atama {
        ad: String,
        deger: Ifade,
    },
    EgerKomutu {
        kosul: Ifade,
        govde: Vec<Komut>,
        degilse_govde: Option<Vec<Komut>>,
    },
    DonguKomutu {
        kosul: Ifade,
        govde: Vec<Komut>,
    },
    FonksiyonTanimla {
        ad: String,
        parametreler: Vec<String>,
        govde: Vec<Komut>,
    },
    DondurKomutu(Ifade),
    YukleKomutu(String),
    SinifTanimla {
        ad: String,
        metotlar: Vec<Komut>,
    },
    YazdirKomutu(Ifade),
    IfadeKomutu(Ifade),
}
