yükle "gui.hb";

// Sürüm kontrolü
gui_ver = gui_sürüm_al()
yaz("Kullanılan GUI Sürümü: " + gui_ver)

// Global durum değişkenleri
aktif_sekme = 1 olsun
isim = "Hüma Geliştiricisi" olsun
yaş = 20 olsun
onay_verdi_mi = 0 olsun
sayaç = 0 olsun
pencere_acik = 0 olsun

// ===================
// SEKME 1 (Ana Sayfa)
// ===================

yas_bilgisi fonksiyon olsun {
    yazı_ekle("Seçilen Yaş: " + yaş)
    yaş > 50 ise {
        yazı_ekle(" (Yarım asrı devirmişsiniz!)")
    }
}

sekme1_icerik fonksiyon olsun {
    büyük_başlık("PROFİL BİLGİLERİ")
    boşluk_bırak(8.0)
    
    // Genişliği 300px olarak sabitlenmiş metin kutusu
    isim = boyutlu_metin_kutusu_ekle(isim, 300.0)
    
    boşluk_bırak(5.0)
    renkli_yazı_ekle("Merhaba " + isim + "!", 0, 150, 255)
    
    boşluk_bırak(5.0)
    ayraç_çiz()
    boşluk_bırak(5.0)
    
    yaş = kaydırıcı_ekle(yaş, 0, 100)
    yan_yana_diz(yas_bilgisi)
}

// ===================
// SEKME 2 (Ayarlar)
// ===================

buton_islemleri fonksiyon olsun {
    // 150x40px boyutlarında büyük butonlar
    boyutlu_renkli_buton_ekle("Sayacı Artır", 150.0, 40.0, 50, 200, 50) ise {
        sayaç = sayaç + 1
    }
    boyutlu_renkli_buton_ekle("Sıfırla", 100.0, 40.0, 255, 100, 100) ise {
        sayaç = 0
    }
    boşluk_bırak(10.0)
    kalın_yazı_ekle("Sayaç: " + sayaç)
}

tema_ayarlari fonksiyon olsun {
    buton_ekle("Koyu Tema 🌙") ise {
        tema_degistir("koyu")
    }
    buton_ekle("Açık Tema ☀️") ise {
        tema_degistir("açık")
    }
}

sekme2_icerik fonksiyon olsun {
    büyük_başlık("UYGULAMA AYARLARI")
    boşluk_bırak(8.0)
    
    yan_yana_diz(buton_islemleri)
    
    boşluk_bırak(8.0)
    yazı_ekle("Görünüm Ayarları:")
    yan_yana_diz(tema_ayarlari)
    
    boşluk_bırak(5.0)
    ayraç_çiz()
    boşluk_bırak(5.0)
    
    onay_verdi_mi = onay_kutusu_ekle(onay_verdi_mi, "Geliştirici İstatistiklerine İzin Ver")
    
    onay_verdi_mi == 1 ise {
        boşluk_bırak(5.0)
        eğik_yazı_ekle("Teşekkürler, anonim veriler arkaplanda toplanıyor.")
    }
    
    boşluk_bırak(10.0)
    buton_ekle("Yüzen Pencereyi Aç") ise {
        pencere_acik = 1
    }
}

// ===================
// SEKME 3 (Tablo ve Veriler)
// ===================

tablo_verileri fonksiyon olsun {
    kalın_yazı_ekle("ID")
    kalın_yazı_ekle("Öğe Adı")
    kalın_yazı_ekle("Durum")
    yeni_satır_ekle()
    
    yazı_ekle("1")
    yazı_ekle("Hüma Derleyicisi")
    renkli_yazı_ekle("Aktif", 50, 200, 50)
    yeni_satır_ekle()
    
    yazı_ekle("2")
    yazı_ekle("Gelişmiş GUI")
    renkli_yazı_ekle("Tamamlanıyor", 255, 150, 0)
    yeni_satır_ekle()
    
    yazı_ekle("3")
    yazı_ekle("Ağ Kartları")
    renkli_yazı_ekle("Beklemede", 150, 150, 150)
    yeni_satır_ekle()
    
    yazı_ekle("4")
    yazı_ekle("Paket Yöneticisi")
    renkli_yazı_ekle("Beklemede", 150, 150, 150)
    yeni_satır_ekle()
}

tablo_sarma fonksiyon olsun {
    grid_ekle("demo_grid_1", tablo_verileri)
}

sekme3_icerik fonksiyon olsun {
    büyük_başlık("GRID (Izgara) Layout Görünümü")
    boşluk_bırak(8.0)
    
    yazı_ekle("egui native grid altyapısı ScrollBox ile birlikte:")
    boşluk_bırak(5.0)
    kaydırılabilir_liste_ekle("kaydirilan_tablo", tablo_sarma)
}

// ===================
// YÜZEN PENCERE

// ===================

pencere_icerigi fonksiyon olsun {
    büyük_başlık("Dikkat!")
    renkli_yazı_ekle("Ben bir yüzen (floating) pencereyim!", 255, 100, 100)
    yazı_ekle("Mevcut Sayaç: " + sayaç)
    
    buton_ekle("Beni Kapat") ise {
        pencere_acik = 0
    }
}

// ===================
// ÜST MENÜ VE ÇERÇEVE
// ===================

dosya_menusu fonksiyon olsun {
    buton_ekle("Kaydet") ise {
        yaz("Kaydet'e tıklandı.")
    }
    buton_ekle("Ayarlar") ise {
        aktif_sekme = 2
    }
}

duzen_menusu fonksiyon olsun {
    buton_ekle("Geri Al")
    buton_ekle("Yeniden Yap")
}

hakkinda_menusu fonksiyon olsun {
    yazı_ekle("Hüma v0.3.1 GUI v" + gui_ver)
}

ust_menu fonksiyon olsun {
    açılır_menü_ekle("Dosya", dosya_menusu)
    açılır_menü_ekle("Düzen", duzen_menusu)
    açılır_menü_ekle("Hakkında", hakkinda_menusu)
}

sekme_cubugu_fks fonksiyon olsun {
    sekme_ekle(aktif_sekme == 1, "Profil") == 1 ise {
        aktif_sekme = 1
    }
    sekme_ekle(aktif_sekme == 2, "Ayarlar") == 1 ise {
        aktif_sekme = 2
    }
    sekme_ekle(aktif_sekme == 3, "Grid Mimarisi") == 1 ise {
        aktif_sekme = 3
    }
}

// ===================
// ANA ÇİZİM DÖNGÜSÜ
// ===================

çizim_fks fonksiyon olsun {
    menü_çubuğu_ekle(ust_menu)
    boşluk_bırak(5.0)
    
    yan_yana_diz(sekme_cubugu_fks)
    
    ayraç_çiz()
    boşluk_bırak(8.0)
    
    aktif_sekme == 1 ise {
        grup_kutusu_ekle("Profil Özellikleri", sekme1_icerik)
    }
    
    aktif_sekme == 2 ise {
        grup_kutusu_ekle("Sistem Ayarları", sekme2_icerik)
    }
    
    aktif_sekme == 3 ise {
        grup_kutusu_ekle("Veri Tablosu", sekme3_icerik)
    }
    
    // Yüzen Pencere Durumu
    pencere_acik == 1 ise {
        pencere_acik = yüzen_pencere_ekle("Uyarı Ekranı", pencere_acik, pencere_icerigi)
    }
}

pencere_oluştur("Hüma Zengin GUI v2.5", 600.0, 500.0, çizim_fks)
