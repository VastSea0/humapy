// Birim Test Çerçevesi

__toplam_test = 0 olsun
__başarılı_test = 0 olsun

test_et fonksiyon olsun ad, f alsın {
    __toplam_test = __toplam_test + 1 olsun
    "[TEST] " + ad + " ..."'yı yazdır
    sonuc = f() olsun
    sonuc ise {
        "  -> BAŞARILI"'yı yazdır
        __başarılı_test = __başarılı_test + 1 olsun
    } yoksa {
        "  -> !!! HATA !!!"'yı yazdır
    }
}

test_raporu fonksiyon olsun {
    "-----------------------------"'yı yazdır
    "Toplam Test: " + __toplam_test'i yazdır
    "Başarılı: " + __başarılı_test'i yazdır
    "Başarısız: " + (__toplam_test - __başarılı_test)'i yazdır
    "-----------------------------"'yı yazdır
}

iddia_et fonksiyon olsun a, b, mesaj alsın {
    a = b ise { 1'i döndür }
    "  Hata: " + mesaj + " (Beklenen: " + a + ", Gelen: " + b + ")"'yi yazdır
    0'ı döndür
}
