SIFIR = "\x1b[0m" olsun
KIRMIZI = "\x1b[31m" olsun
YESIL = "\x1b[32m" olsun
SARI = "\x1b[33m" olsun
MAVI = "\x1b[34m" olsun
TURKUAZ = "\x1b[36m" olsun
KALIN = "\x1b[1m" olsun

renkli_yaz fonksiyon olsun metin, renk alsın {
    renk + metin + SIFIR'ı yazdır
}

hata_yaz fonksiyon olsun metin alsın {
    KALIN + KIRMIZI + "[HATA] " + SIFIR + metin'i yazdır
}

başarı_yaz fonksiyon olsun metin alsın {
    KALIN + YESIL + "[BAŞARI] " + SIFIR + metin'i yazdır
}

uyarı_yaz fonksiyon olsun metin alsın {
    KALIN + SARI + "[UYARI] " + SIFIR + metin'i yazdır
}
