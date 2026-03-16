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
    EsitEsittir,    // ==
    AcikParantez,   // (
    KapaliParantez, // )
    AcikSuskun,     // {
    KapaliSuskun,   // }
    Virgul,         // ,
    NoktaliVirgul,  // ;

    // Kontrol
    Hata(String),
    Son,
}
