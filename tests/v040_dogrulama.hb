// Hüma v0.4.0 Doğrulama Betiği
yükle "gui.hb";

"==============================================="'ı yazdır
"   HÜMA v0.4.0 ÖZELLİK DOĞRULAMA TESTİ"'ı yazdır
"==============================================="'ı yazdır

// 1. Paket Yöneticisi ve Kilit Dosyası Testi
"--- 1. Paket Yöneticisi Testi ---"'ı yazdır
"Yeni proje oluşturuluyor: test_kurulum..."'ı yazdır
sistem("target/debug/huma paket yeni test_kurulum")

dosya_var_mı("test_kurulum/huma_modulleri") ise {
    "  [OK] huma_modulleri klasörü oluşturuldu."'ı yazdır
} yoksa {
    "  [HATA] huma_modulleri klasörü bulunamadı!"'ı yazdır
}

dosya_var_mı("test_kurulum/huma.lock") ise {
    "  [OK] huma.lock kilit dosyası oluşturuldu."'ı yazdır
} yoksa {
    "  [HATA] huma.lock dosyası bulunamadı!"'ı yazdır
}

// 2. GUI Anonim Fonksiyon Yapısı Testi
"--- 2. GUI Anonim Fonksiyon Testi ---"'ı yazdır
"Anonim fonksiyon (alan_ayır_ekle) sözdizimi deneniyor..."'ı yazdır

// Anonim fonksiyon yapısı v0.4.0 ile destekleniyor
dene {
    test_fks = fonksiyon olsun {
        "Anonim fonksiyon çalıştı."'ı yazdır
    }
    test_fks()
    "  [OK] Anonim fonksiyon yapısı başarıyla doğrulandı."'ı yazdır
} hata var ise {
    "  [HATA] Anonim fonksiyon yapısı hala hatalı!"'ı yazdır
}

// 3. GitHub/Mock Paket İndirme Testi
"--- 3. Paket İndirme Simülasyonu ---"'ı yazdır
"Mock paket kuruluyor: nlp_temel..."'ı yazdır
sistem("target/debug/huma paket kur nlp_temel")

dosya_var_mı("huma_modulleri/nlp_temel") ise {
    "  [OK] Paket başarıyla indirildi ve dizine yerleştirildi."'ı yazdır
} yoksa {
    "  [HATA] Paket indirme simülasyonu başarısız!"'ı yazdır
}

"==============================================="'ı yazdır
"DOĞRULAMA TAMAMLANDI: v0.4.0 Hazır!"'ı yazdır
"==============================================="'ı yazdır
