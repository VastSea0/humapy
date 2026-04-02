# Başlık Testi
yükle "ag_istekleri";

"Hüma Başlık Desteği Test Ediliyor..."'ı yazdır

// 1. Başlıklar nesnesi oluştur
Baslik sınıf olsun {
    X_Huma_Version = "v1.1.0" olsun
    User_Agent = "Huma-Lang-Agent" olsun
}
h = Baslik() olsun
h.X_Huma_Version = "v1.1.0"
h["X-Custom-Header"] = "Huma-Rules"

// 2. httpbin.org/headers adresine istek at
// Bu endpoint gönderilen başlıkları geri döndürür.
url = "https://httpbin.org/headers" olsun
cevap = getir(url, h)

cevap.durum == 200 ise {
    "İstek başarılı!"'ı yazdır
    "Geri dönen başlıklar:"'ı yazdır
    cevap.içerik'i yazdır
    
    // Basit doğrulama
    içeriyor(cevap.içerik, "Huma-Rules") ise {
        "BAŞARILI: Başlıklar sunucuya ulaştı!"'ı yazdır
    } yoksa {
        "HATA: Başlıklar sunucuya ulaşmamış görünüyor."'ı yazdır
    }
} yoksa {
    ("İstek hatası (" + cevap.durum + "): " + cevap.hata)'yı yazdır
}
