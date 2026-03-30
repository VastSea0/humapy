yükle "gui.hb";

// Global durum değişkenleri
isim = "Hüma Geliştiricisi" olsun
yaş = 20 olsun
onay_verdi_mi = 0 olsun
sayaç = 0 olsun

yas_bilgisi fonksiyon olsun {
    yazı_ekle("Seçilen Yaş: " + yaş)
    yaş > 50 ise {
        yazı_ekle(" (Yarım asrı devirmişsiniz!)")
    }
}

buton_islemleri fonksiyon olsun {
    buton_ekle("Sayacı Artır") ise {
        sayaç = sayaç + 1
    }
    buton_ekle("Sıfırla") ise {
        sayaç = 0
    }
    yazı_ekle(" => Sayaç Değeri: " + sayaç)
}

çizim_fks fonksiyon olsun {
    yazı_ekle("=== HÜMA KAPSAMLI ARAYÜZ DEMOSU ===")
    boşluk_bırak(8.0)
    
    isim = metin_kutusu_ekle(isim)
    yazı_ekle("Merhaba " + isim + "!")
    
    boşluk_bırak(5.0)
    ayraç_çiz()
    boşluk_bırak(5.0)
    
    yaş = kaydırıcı_ekle(yaş, 0, 100)
    yan_yana_diz(yas_bilgisi)
    
    boşluk_bırak(5.0)
    ayraç_çiz()
    boşluk_bırak(5.0)
    
    yan_yana_diz(buton_islemleri)
    
    boşluk_bırak(5.0)
    ayraç_çiz()
    boşluk_bırak(5.0)
    
    onay_verdi_mi = onay_kutusu_ekle(onay_verdi_mi, "Tüm lisans şartlarını okudum ve kabul ediyorum.")
    
    onay_verdi_mi == 1 ise {
        boşluk_bırak(5.0)
        yazı_ekle("Teşekkürler, şartları kabul ettiniz. İşlem devam edebilir.")
    } yoksa {
        boşluk_bırak(5.0)
        yazı_ekle("Lütfen devam etmek için şartları kabul edin!")
    }
}

pencere_oluştur("Hüma Zengin GUI Testi", çizim_fks)
