yükle "renkler.hb";

beklet fonksiyon olsun saniye alsın {
    uyut(saniye * 1000)
}

kronometre_başlat fonksiyon olsun {
    zaman()'ı döndür
}

kronometre_bitir fonksiyon olsun başlangıç alsın {
    bitiş = zaman() olsun
    fark = bitiş - başlangıç olsun
    renkli_yaz("Geçen süre: " + fark + " saniye", TURKUAZ)
    fark'ı döndür
}
