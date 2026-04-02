yükle "huma_sunucu";

s = Sunucu() olsun
s.kur(3000)
s.cors_ayarla("*") // Tüm kökenlerden isteklere izin ver

// 1. Statik Rota
s.getir("/", fonksiyon olsun istek, cevap alsın {
    cevap.html("<h1>Hüma Modern Backend</h1>")
})

// 2. Dinamik Rota (Path Parameters)
s.getir("/api/kullanici/:id", fonksiyon olsun istek, cevap alsın {
    kid = değer_al(istek.parametreler, "id")
    
    // JSON yanıt dön
    res = metinden_nesneye("{}") olsun
    değer_ata(res, "mesaj", "Kullanıcı detayı başarıyla getirildi.")
    değer_ata(res, "kullanici_id", kid)
    
    cevap.json(res)
})

// 3. POST Rotası
s.gönder("/api/gonder", fonksiyon olsun istek, cevap alsın {
    "Veri geldi: " + (istek'in gövde)'yi yazdır
    cevap.durum(201)
})

"Hüma Modern Backend başlatılıyor (Port 3000)..."'ı yazdır
s.baslat()
