yükle "gui.hb";

// DURUM DEĞİŞKENLERİ
ocak_satis = 120.0 olsun
subat_satis = 150.0 olsun
mart_satis = 180.0 olsun
toplam_satis = 0.0 olsun
hedef_satis = 500.0 olsun

hesapla_toplam_fks fonksiyon olsun {
    toplam_satis = ocak_satis + subat_satis + mart_satis
}

ayarlar_fks fonksiyon olsun {
    yazı_ekle("Ocak Satışları (₺):")
    ocak_satis = kaydırıcı_ekle(ocak_satis, 0, 1000)
    
    boşluk_bırak(5.0)
    yazı_ekle("Şubat Satışları (₺):")
    subat_satis = kaydırıcı_ekle(subat_satis, 0, 1000)
    
    boşluk_bırak(5.0)
    yazı_ekle("Mart Satışları (₺):")
    mart_satis = kaydırıcı_ekle(mart_satis, 0, 1000)
    
    boşluk_bırak(15.0)
    yazı_ekle("Yıllık Satış Hedefi:")
    hedef_satis = kaydırıcı_ekle(hedef_satis, 100, 5000)
}

grafik_mockup_fks fonksiyon olsun {
    // Sütun grafikleri andıran çubuklar yapıyoruz
    yazı_ekle("Ocak [" + ocak_satis + "]")
    alan_ayır_ekle(ocak_satis / 2.0, 20.0, fonksiyon olsun {
        buton_ekle("", 0, 200, 255, ocak_satis / 2.0, 20.0)
    })
    
    boşluk_bırak(10.0)
    yazı_ekle("Şubat [" + subat_satis + "]")
    alan_ayır_ekle(subat_satis / 2.0, 20.0, fonksiyon olsun {
        buton_ekle("", 255, 150, 0, subat_satis / 2.0, 20.0)
    })
    
    boşluk_bırak(10.0)
    yazı_ekle("Mart [" + mart_satis + "]")
    alan_ayır_ekle(mart_satis / 2.0, 20.0, fonksiyon olsun {
        buton_ekle("", 100, 255, 100, mart_satis / 2.0, 20.0)
    })
}

ana_cizim_fks fonksiyon olsun {
    hesapla_toplam_fks()
    yazı_ekle("📈 HÜMA FİNANSAL GÖSTERGE PANELİ", "başlık")
    boşluk_bırak(20.0)
    
    yan_yana_diz(fonksiyon olsun {
        grup_kutusu_ekle("Veri Girişi", ayarlar_fks)
        boşluk_bırak(20.0)
        grup_kutusu_ekle("Satış Grafiği (Sütun)", grafik_mockup_fks)
    })
    
    boşluk_bırak(25.0)
    ayraç_çiz()
    boşluk_bırak(15.0)
    
    yazı_ekle("ÖZET İSTATİSTİKLER", "kalın")
    grup_kutusu_ekle("Toplamlar ve Hedefler", fonksiyon olsun {
        toplam_metni = "Toplam 3 Aylık Satış: " + toplam_satis + " ₺" olsun
        yazı_ekle(toplam_metni, "başlık")
        
        yazı_ekle("Hedef İlerleme Durumu (%):", "kalın")
        ilerleme = (toplam_satis / hedef_satis) * 100.0 olsun
        ilerleme_metni = "%" + ilerleme olsun
        yazı_ekle(ilerleme_metni, 0, 200, 100)
    })
}

pencere_oluştur("Hüma Finance Dashboard", 800.0, 600.0, ana_cizim_fks)
