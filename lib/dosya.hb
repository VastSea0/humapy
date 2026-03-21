yükle "renkler.hb";

dosya_var_mı fonksiyon olsun yol alsın {
    icerik = dosya_oku(yol) olsun
    tipi(icerik) = "Metin" ise { 1'i döndür }
    0'ı döndür
}

güvenli_oku fonksiyon olsun yol alsın {
    icerik = dosya_oku(yol) olsun
    tipi(icerik) = "Boş" ise {
        hata_yaz("Dosya okunamadı: " + yol)
        ""'yi döndür
    }
    icerik'i döndür
}

satırlara_ayır fonksiyon olsun metin alsın {
    satırlar = [] olsun
    gecici = "" olsun
    i = 0 olsun
    boy = uzunluk(metin) olsun
    
    i < boy olduğu sürece {
        c = metin[i] olsun
        (c = "\n") ise {
            satırlar = listeye_ekle(satırlar, gecici) olsun
            gecici = "" olsun
        } yoksa {
            gecici = gecici + c olsun
        }
        i = i + 1 olsun
    }
    uzunluk(gecici) > 0 ise {
        satırlar = listeye_ekle(satırlar, gecici) olsun
    }
    satırlar'ı döndür
}
