// Dizgi (String) Yardımcı Fonksiyonları

büyük_mü fonksiyon olsun karakter alsın {
    (karakter >= "A") ve (karakter <= "Z")'yi döndür
}

küçük_mü fonksiyon olsun karakter alsın {
    (karakter >= "a") ve (karakter <= "z")'yi döndür
}

boşluk_mu fonksiyon olsun karakter alsın {
    (karakter = " ") veya (karakter = "\n") veya (karakter = "\t")'yi döndür
}

içeriyor_mu fonksiyon olsun dizgi, aranan alsın {
    i = 0 olsun
    boy = uzunluk(dizgi) olsun
    aranan_boy = uzunluk(aranan) olsun
    
    i <= (boy - aranan_boy) olduğu sürece {
        j = 0 olsun
        eşleşti = 1 olsun
        j < aranan_boy olduğu sürece {
            dizgi[i + j] != aranan[j] ise {
                eşleşti = 0 olsun
                j = aranan_boy olsun
            }
            j = j + 1 olsun
        }
        eşleşti ise { 1'i döndür }
        i = i + 1 olsun
    }
    0'ı döndür
}

başıyla_mı_başlıyor fonksiyon olsun dizgi, ön_ek alsın {
    boy = uzunluk(ön_ek) olsun
    i = 0 olsun
    i < boy olduğu sürece {
        dizgi[i] != ön_ek[i] ise { 0'ı döndür }
        i = i + 1 olsun
    }
    1'i döndür
}

sonuyla_mı_bitiyor fonksiyon olsun dizgi, son_ek alsın {
    boy = uzunluk(dizgi) olsun
    son_boy = uzunluk(son_ek) olsun
    i = 0 olsun
    i < son_boy olduğu sürece {
        dizgi[boy - son_boy + i] != son_ek[i] ise { 0'ı döndür }
        i = i + 1 olsun
    }
    1'i döndür
}

kırp fonksiyon olsun dizgi alsın {
    bas = 0 olsun
    son = uzunluk(dizgi) - 1 olsun
    
    (bas <= son) ve boşluk_mu(dizgi[bas]) olduğu sürece {
        bas = bas + 1 olsun
    }
    
    (son >= bas) ve boşluk_mu(dizgi[son]) olduğu sürece {
        son = son - 1 olsun
    }
    
    sonuc = "" olsun
    i = bas olsun
    i <= son olduğu sürece {
        sonuc = sonuc + dizgi[i] olsun
        i = i + 1 olsun
    }
    sonuc'u döndür
}
