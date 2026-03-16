// Dizgi (String) Yardımcı Fonksiyonları

fonksiyon büyük_mü(karakter) {
    döndür (karakter >= "A") ve (karakter <= "Z");
}

fonksiyon küçük_mü(karakter) {
    döndür (karakter >= "a") ve (karakter <= "z");
}

fonksiyon boşluk_mu(karakter) {
    döndür (karakter == " ") veya (karakter == "\n") veya (karakter == "\t");
}

fonksiyon içeriyor_mu(dizgi, aranan) {
    değişken i = 0;
    değişken boy = uzunluk(dizgi);
    değişken aranan_boy = uzunluk(aranan);
    
    döngü i <= (boy - aranan_boy) {
        değişken j = 0;
        değişken eşleşti = 1;
        döngü j < aranan_boy {
            eğer dizgi[i + j] != aranan[j] {
                eşleşti = 0;
                j = aranan_boy; // break
            }
            j = j + 1;
        }
        eğer eşleşti { döndür 1; }
        i = i + 1;
    }
    döndür 0;
}

fonksiyon başıyla_mı_başlıyor(dizgi, ön_ek) {
    değişken boy = uzunluk(ön_ek);
    değişken i = 0;
    döngü i < boy {
        eğer dizgi[i] != ön_ek[i] { döndür 0; }
        i = i + 1;
    }
    döndür 1;
}

fonksiyon sonuyla_mı_bitiyor(dizgi, son_ek) {
    değişken boy = uzunluk(dizgi);
    değişken son_boy = uzunluk(son_ek);
    değişken i = 0;
    döngü i < son_boy {
        eğer dizgi[boy - son_boy + i] != son_ek[i] { döndür 0; }
        i = i + 1;
    }
    döndür 1;
}

fonksiyon kırp(dizgi) {
    değişken bas = 0;
    değişken son = uzunluk(dizgi) - 1;
    
    döngü (bas <= son) ve boşluk_mu(dizgi[bas]) {
        bas = bas + 1;
    }
    
    döngü (son >= bas) ve boşluk_mu(dizgi[son]) {
        son = son - 1;
    }
    
    değişken sonuc = "";
    değişken i = bas;
    döngü i <= son {
        sonuc = sonuc + dizgi[i];
        i = i + 1;
    }
    döndür sonuc;
}
