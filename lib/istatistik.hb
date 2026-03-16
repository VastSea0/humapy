yükle "matematik.hb";

fonksiyon ortalama(liste) {
    değişken toplam = 0;
    değişken boy = uzunluk(liste);
    eğer boy == 0 { döndür 0; }
    
    değişken i = 0;
    döngü i < boy {
        toplam = toplam + liste[i];
        i = i + 1;
    }
    döndür toplam / boy;
}

fonksiyon en_büyük(liste) {
    değişken boy = uzunluk(liste);
    eğer boy == 0 { döndür Boş; }
    değişken eb = liste[0];
    değişken i = 1;
    döngü i < boy {
        eğer liste[i] > eb { eb = liste[i]; }
        i = i + 1;
    }
    döndür eb;
}

fonksiyon en_küçük(liste) {
    değişken boy = uzunluk(liste);
    eğer boy == 0 { döndür Boş; }
    değişken ek = liste[0];
    değişken i = 1;
    döngü i < boy {
        eğer liste[i] < ek { ek = liste[i]; }
        i = i + 1;
    }
    döndür ek;
}

fonksiyon varyans(liste) {
    değişken ort = ortalama(liste);
    değişken toplam_kare_fark = 0;
    değişken boy = uzunluk(liste);
    
    değişken i = 0;
    döngü i < boy {
        değişken fark = liste[i] - ort;
        toplam_kare_fark = toplam_kare_fark + karesi(fark);
        i = i + 1;
    }
    döndür toplam_kare_fark / boy;
}

fonksiyon standart_sapma(liste) {
    döndür karekök(varyans(liste));
}
