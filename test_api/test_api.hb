yükle "huma_sunucu";

sunucu = Sunucu() olsun
sunucu.kur(8888)

# Ana sayfa
sunucu.getir("/", fonksiyon olsun istek, cevap alsın {
    cevap.html("<h1>Hüma Sunucuya Hoş Geldiniz!</h1><p>Bu bir Hüma Backend API'sidir.</p>")
})

# JSON API
sunucu.getir("/api/durum", fonksiyon olsun istek, cevap alsın {
    veri = {
        "durum": "aktif",
        "mesaj": "Hüma backend başarıyla çalışıyor!",
        "zaman": zaman()
    } olsun
    cevap.json(veri)
})

# Echo POST
sunucu.gönder("/echo", fonksiyon olsun istek, cevap alsın {
    gelen_veri = metinden_nesneye(istek'in gövde) olsun
    cevap.json({ "echo": gelen_veri })
})

sunucu.baslat()
