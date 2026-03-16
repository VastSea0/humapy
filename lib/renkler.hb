değişken SIFIR = "\x1b[0m";
değişken KIRMIZI = "\x1b[31m";
değişken YESIL = "\x1b[32m";
değişken SARI = "\x1b[33m";
değişken MAVI = "\x1b[34m";
değişken TURKUAZ = "\x1b[36m";
değişken KALIN = "\x1b[1m";

fonksiyon renkli_yaz(metin, renk) {
    yazdır(renk + metin + SIFIR);
}

fonksiyon hata_yaz(metin) {
    yazdır(KALIN + KIRMIZI + "[HATA] " + SIFIR + metin);
}

fonksiyon başarı_yaz(metin) {
    yazdır(KALIN + YESIL + "[BAŞARI] " + SIFIR + metin);
}

fonksiyon uyarı_yaz(metin) {
    yazdır(KALIN + SARI + "[UYARI] " + SIFIR + metin);
}
