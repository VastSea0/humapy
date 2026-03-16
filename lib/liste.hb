// Gelişmiş Liste İşlemleri

fonksiyon yazdır_liste(liste) {
    yazdır(liste);
}

fonksiyon iceriyor_mu(liste, eleman) {
    değişken boy = uzunluk(liste);
    değişken i = 0;
    döngü i < boy {
        eğer liste[i] == eleman { döndür 1; }
        i = i + 1;
    }
    döndür 0;
}

fonksiyon ters_cevir(liste) {
    değişken yeni = [];
    değişken i = uzunluk(liste) - 1;
    döngü i >= 0 {
        yeni = listeye_ekle(yeni, liste[i]);
        i = i - 1;
    }
    döndür yeni;
}

// Fonksiyonel Araçlar
fonksiyon eşle(liste, f) {
    değişken sonuç = [];
    değişken i = 0;
    değişken boy = uzunluk(liste);
    döngü i < boy {
        sonuç = listeye_ekle(sonuç, f(liste[i]));
        i = i + 1;
    }
    döndür sonuç;
}

fonksiyon filtrele(liste, f) {
    değişken sonuç = [];
    değişken i = 0;
    değişken boy = uzunluk(liste);
    döngü i < boy {
        değişken eleman = liste[i];
        eğer f(eleman) {
            sonuç = listeye_ekle(sonuç, eleman);
        }
        i = i + 1;
    }
    döndür sonuç;
}

fonksiyon indirge(liste, f, başlangıç) {
    değişken akümülatör = başlangıç;
    değişken i = 0;
    değişken boy = uzunluk(liste);
    döngü i < boy {
        akümülatör = f(akümülatör, liste[i]);
        i = i + 1;
    }
    döndür akümülatör;
}

fonksiyon dilimle(liste, baş, son) {
    değişken sonuç = [];
    değişken i = baş;
    döngü i < son {
        sonuç = listeye_ekle(sonuç, liste[i]);
        i = i + 1;
    }
    döndür sonuç;
}
