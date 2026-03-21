yükle "matematik.hb";

ortalama fonksiyon olsun liste alsın {
    toplam = 0 olsun
    boy = uzunluk(liste) olsun
    boy = 0 ise { 0'ı döndür }
    
    i = 0 olsun
    i < boy olduğu sürece {
        toplam = toplam + liste[i] olsun
        i = i + 1 olsun
    }
    toplam / boy'u döndür
}

en_büyük fonksiyon olsun liste alsın {
    boy = uzunluk(liste) olsun
    boy = 0 ise { 0'ı döndür }
    eb = liste[0] olsun
    i = 1 olsun
    i < boy olduğu sürece {
        liste[i] > eb ise { eb = liste[i] olsun }
        i = i + 1 olsun
    }
    eb'yi döndür
}

en_küçük fonksiyon olsun liste alsın {
    boy = uzunluk(liste) olsun
    boy = 0 ise { 0'ı döndür }
    ek = liste[0] olsun
    i = 1 olsun
    i < boy olduğu sürece {
        liste[i] < ek ise { ek = liste[i] olsun }
        i = i + 1 olsun
    }
    ek'i döndür
}

varyans fonksiyon olsun liste alsın {
    ort = ortalama(liste) olsun
    toplam_kare_fark = 0 olsun
    boy = uzunluk(liste) olsun
    
    i = 0 olsun
    i < boy olduğu sürece {
        fark = liste[i] - ort olsun
        toplam_kare_fark = toplam_kare_fark + karesi(fark) olsun
        i = i + 1 olsun
    }
    toplam_kare_fark / boy'u döndür
}

standart_sapma fonksiyon olsun liste alsın {
    karekök(varyans(liste))'yi döndür
}
