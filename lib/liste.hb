// Gelişmiş Liste İşlemleri

yazdır_liste fonksiyon olsun liste alsın {
    liste'yi yazdır
}

iceriyor_mu fonksiyon olsun liste, eleman alsın {
    boy = uzunluk(liste) olsun
    i = 0 olsun
    i < boy olduğu sürece {
        liste[i] = eleman ise { 1'i döndür }
        i = i + 1 olsun
    }
    0'ı döndür
}

ters_cevir fonksiyon olsun liste alsın {
    yeni = [] olsun
    i = uzunluk(liste) - 1 olsun
    i >= 0 olduğu sürece {
        yeni = listeye_ekle(yeni, liste[i]) olsun
        i = i - 1 olsun
    }
    yeni'yi döndür
}

// Fonksiyonel Araçlar
eşle fonksiyon olsun liste, f alsın {
    sonuç = [] olsun
    i = 0 olsun
    boy = uzunluk(liste) olsun
    i < boy olduğu sürece {
        sonuç = listeye_ekle(sonuç, f(liste[i])) olsun
        i = i + 1 olsun
    }
    sonuç'u döndür
}

filtrele fonksiyon olsun liste, f alsın {
    sonuç = [] olsun
    i = 0 olsun
    boy = uzunluk(liste) olsun
    i < boy olduğu sürece {
        eleman = liste[i] olsun
        f(eleman) ise {
            sonuç = listeye_ekle(sonuç, eleman) olsun
        }
        i = i + 1 olsun
    }
    sonuç'u döndür
}

indirge fonksiyon olsun liste, f, başlangıç alsın {
    akümülatör = başlangıç olsun
    i = 0 olsun
    boy = uzunluk(liste) olsun
    i < boy olduğu sürece {
        akümülatör = f(akümülatör, liste[i]) olsun
        i = i + 1 olsun
    }
    akümülatör'ü döndür
}

dilimle fonksiyon olsun liste, baş, son alsın {
    sonuç = [] olsun
    i = baş olsun
    i < son olduğu sürece {
        sonuç = listeye_ekle(sonuç, liste[i]) olsun
        i = i + 1 olsun
    }
    sonuç'u döndür
}
