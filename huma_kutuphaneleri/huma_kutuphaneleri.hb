yükle "huma_sunucu";

// VERİTABANI YÖNETİMİ
db_dosyasi = "kutuphaneler.json" olsun
veriler = metinden_nesneye(dosya_oku(db_dosyasi)) olsun

kaydet fonksiyon olsun {
    dosya_yaz(db_dosyasi, nesneden_metine(veriler))
}

sunucu = Sunucu() olsun
sunucu.kur(3000)

// 1. ANA SAYFA
sunucu.getir("/", fonksiyon olsun istek, cevap alsın {
    html = dosya_oku("template_index.html") olsun
    cevap.html(html)
})

// 2. KÜTÜPHANE EKLE SAYFASI
sunucu.getir("/ekle", fonksiyon olsun istek, cevap alsın {
    html = dosya_oku("template_ekle.html") olsun
    cevap.html(html)
})

// 3. API - TÜM KÜTÜPHANELER
sunucu.getir("/api/kutuphaneler", fonksiyon olsun istek, cevap alsın {
    cevap.json(veriler)
})

// 4. API - YENİ KÜTÜPHANE GÖNDER
sunucu.gönder("/api/gonder", fonksiyon olsun istek, cevap alsın {
    yok = metinden_nesneye(istek.gövde) olsun
    yok.durum = "bekliyor" olsun
    yok.indirme_sayisi = 0 olsun
    
    veriler'e [yok]'u ekle
    kaydet()
    
    sonuc = metinden_nesneye("{}") olsun
    değer_ata(sonuc, "durum", "başarılı")
    cevap.json(sonuc)
})

// 5. ADMIN - BEKLEYENLERİ LİSTELE
sunucu.getir("/admin", fonksiyon olsun istek, cevap alsın {
    html = dosya_oku("template_admin.html") olsun
    cevap.html(html)
})

// 6. API - ONAYLA
sunucu.gönder("/api/onayla", fonksiyon olsun istek, cevap alsın {
    body = metinden_nesneye(istek.gövde) olsun
    hedef_ad = değer_al(body, "ad")
    
    i = 0 olsun
    uz = veriler'in uzunluğu olsun
    bulundu = 0 olsun
    
    i < uz olduğu sürece {
        k = veriler[i] olsun
        değer_al(k, "ad") == hedef_ad ise {
            değer_ata(k, "durum", "onaylandı")
            bulundu = 1 olsun
        }
        i = i + 1 olsun
    }
    
    bulundu == 1 ise {
        kaydet()
    }
    
    sonuc = metinden_nesneye("{}") olsun
    değer_ata(sonuc, "durum", "başarılı")
    cevap.json(sonuc)
})

"Hüma Kütüphane Sunucusu başlatılıyor..."'ı yazdır
sunucu.baslat()