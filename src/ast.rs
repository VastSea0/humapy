use crate::token::Token;

#[derive(Debug, Clone)]
pub enum Ifade {
    Sayi(f64),
    Metin(String),
    Degisken(String),
    IkiliIslem {
        sol: Box<Ifade>,
        operator: Token,
        sag: Box<Ifade>,
    },
    Cagri {
        fonksiyon: String,
        argumanlar: Vec<Ifade>,
    },
}

#[derive(Debug, Clone)]
pub enum Komut {
    DegiskenTanimla {
        ad: String,
        deger: Ifade,
    },
    EgerKomutu {
        kosul: Ifade,
        govde: Vec<Komut>,
        degilse_govde: Option<Vec<Komut>>,
    },
    YazdirKomutu(Ifade),
    IfadeKomutu(Ifade),
}
