yükle "gui.hb";

sayaç = 0 olsun

çizim_fks fonksiyon olsun {
    yazı_ekle("--- HÜMA GRAFİK ARAYÜZÜ (Native) ---");
    yazı_ekle("Sayaç Değeri: " + sayaç);
    
    // 'olsun' kelimesini kaldırarak global değişkeni güncelliyoruz
    buton_ekle("Artır") ise {
        sayaç = sayaç + 1
    }
    
    buton_ekle("Sıfırla") ise {
        sayaç = 0
    }
}

pencere_oluştur("Hüma GUI Testi", çizim_fks);
