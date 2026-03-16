#[derive(Debug, PartialEq, Clone)]
pub enum Token {
    // Anahtar Kelimeler
    Yazdir,
    Eger,
    Yada,
    Degilse,
    Dongu,
    Degisken,
    Fonksiyon,
    Dondur,
    Ve,
    Veya,
    Degil,
    Yukle,

    // Tanımlayıcılar ve Literaller
    Tanimlayici(String),
    Sayi(f64),
    Metin(String),

    // Operatörler ve Semboller
    Esittir,        // =
    Arti,           // +
    Eksi,           // -
    Carpi,          // *
    Bolnu,          // /
    Buyuktur,       // >
    Kucuktur,       // <
    BuyukEsit,      // >=
    KucukEsit,      // <=
    EsitEsittir,    // ==
    EsitDegil,      // !=
    AcikParantez,   // (
    KapaliParantez, // )
    AcikSuskun,     // {
    KapaliSuskun,   // }
    AcikKose,       // [
    KapaliKose,     // ]
    Virgul,         // ,
    NoktaliVirgul,  // ;

    // Kontrol
    Hata(String),
    Son,
}
