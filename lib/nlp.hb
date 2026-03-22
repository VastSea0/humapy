// ══════════════════════════════════════════════════════════════════════════════
// nlp.hb — Hüma Dili Türkçe NLP Temel Kütüphanesi
// Sürüm: 1.0.0
// Yazar: Hüma Proje Ekibi
// Lisans: MIT
//
// Bu kütüphane; tokenizasyon, morfolojik analiz, kök bulma (stemming),
// durak-kelime filtreleme ve temel metin istatistikleri sağlar.
// Tüm fonksiyonlar Türkçe eklemeli dil yapısını gözetir.
// Unicode / UTF-8'e %100 uyumludur.
// ══════════════════════════════════════════════════════════════════════════════

yükle "dizgi.hb";
yükle "liste.hb";

// ─── SABITLER ────────────────────────────────────────────────────────────────
TÜRKÇE_ÜNLÜLER   = "aeıioöuüAEIİOÖUÜ" olsun
TÜRKÇE_NOKTALAMA = ".,;:!?()[]{}\"'/-–—" olsun

// Yaygın Türkçe durak kelimeler — Liste formatında hızlı arama için
DURAK_LISTESİ = ["bir", "bu", "şu", "o", "ve", "veya", "ile", "da", "de", "mi", "mı", "mu", "mü", "ki", "ise", "çok", "az", "daha", "en", "ne", "ama", "için", "gibi", "kadar", "sonra", "önce", "üzere", "göre", "hem", "ya", "ancak", "fakat", "hatta", "bile", "ben", "sen", "biz", "siz", "onlar", "bunlar", "şunlar", "var", "yok", "olan", "değil", "her"] olsun

// Türkçe yaygın çekim ekleri (sondan eklemeli sıralama önemlidir)
ÇEKIM_EKLERİ = [
    // Fiilimsiler ve birleşik ekler
    "ştırmak", "ştirmek", "laştır", "leştir", "abilmek", "ebilmek", "abilir", "ebilir",
    "acaklar", "ecekler", "acaktı", "ecekti", "maktan", "mekten", "makta", "mekte",
    "dıkça", "dikçe", "dukça", "dükçe", "tıkça", "tikçe", "tukça", "tükçe",
    "yacak", "yecek", "arak", "erek", "ınca", "ince", "unca", "ünce", "madan", "meden",
    
    // Geçmiş zamanlar, gelecek, şimdiki, geniş zaman
    "mıştı", "mişti", "muştu", "müştü", "tıydı", "tiydi", "tuydı", "tüydü",
    "ıyor", "iyor", "uyor", "üyor", "acak", "ecek", "ardı", "erdi", "ırdı", "irdi",
    "mış", "miş", "muş", "müş", "tık", "tik", "tuk", "tük", "dık", "dik", "duk", "dük",
    "lar", "ler", "mak", "mek", "ken",

    // Hal Ekleri
    "lardan", "lerden", "larla", "lerle", "ından", "inden", "undan", "ünden",
    "ların", "lerin", "ların", "lerin", "ndaki", "ndeki", "daki", "deki", "taki", "teki",
    "dan", "den", "tan", "ten", "nda", "nde", "nta", "nte",
    "nın", "nin", "nun", "nün", "na", "ne", "nı", "ni", "nu", "nü",
    "da", "de", "ta", "te", "ya", "ye", "yı", "yi", "yu", "yü",

    // Kişi ve İyelik
    "ımız", "imiz", "umuz", "ümüz", "ınız", "iniz", "unuz", "ünüz", "mız", "miz", "nız", "niz",
    "ları", "leri", "sın", "sin", "sun", "sün", "sın", "sin",

    // Kısa zaman ve fiil ekleri
    "dı", "di", "du", "dü", "tı", "ti", "tu", "tü", "sa", "se", "ma", "me", "mı", "mi", "mu", "mü",
    "ar", "er", "ır", "ir", "ur", "ür", "ıp", "ip", "up", "üp", 
    "ın", "in", "un", "ün", "ım", "im", "um", "üm", "am", "em",
    "ı", "i", "u", "ü", "a", "e"
] olsun

// ─── MODÜL 1: TEMİZLEME VE NORMALİZASYON ──────────────────────────────────

// nlp_temizle(metin) → noktalama işaretlerini kaldırır, küçük harfe çevirir
nlp_temizle fonksiyon olsun metin alsın {
    sonuç = küçük_harf(metin) olsun
    // Yaygın Türkçe noktalama karakterlerini boşlukla değiştir
    sonuç = değiştir(sonuç, ".", " ") olsun
    sonuç = değiştir(sonuç, ",", " ") olsun
    sonuç = değiştir(sonuç, ";", " ") olsun
    sonuç = değiştir(sonuç, ":", " ") olsun
    sonuç = değiştir(sonuç, "!", " ") olsun
    sonuç = değiştir(sonuç, "?", " ") olsun
    sonuç = değiştir(sonuç, "(", " ") olsun
    sonuç = değiştir(sonuç, ")", " ") olsun
    sonuç = değiştir(sonuç, "\"", " ") olsun
    sonuç = değiştir(sonuç, "\n", " ") olsun
    sonuç = değiştir(sonuç, "\t", " ") olsun
    sonuç'u döndür
}

// ─── MODÜL 2: TOKENİZASYON ─────────────────────────────────────────────────

// tokenize(metin) → boşluğa göre kelimelere ayırır, boş elemanları eler
tokenize fonksiyon olsun metin alsın {
    parcalar = böl(metin, " ") olsun
    temiz_parcalar = [] olsun
    i = 0 olsun
    n = uzunluk(parcalar) olsun
    i < n olduğu sürece {
        tok = kırp(parcalar[i]) olsun
        uzunluk(tok) > 0 ise {
            temiz_parcalar'a [tok] ekle
        }
        i = i + 1 olsun
    }
    temiz_parcalar'ı döndür
}

// nlp_tokenize(metin) → temizlik + tokenizasyonu birleştirir
nlp_tokenize fonksiyon olsun metin alsın {
    temiz = nlp_temizle(metin) olsun
    tokenize(temiz)'i döndür
}

// karakter_tokenize(metin) → her karakteri ayrı bir token yapar
karakter_tokenize fonksiyon olsun metin alsın {
    böl(metin, "")'i döndür
}

// ─── MODÜL 3: DURAK KELİME FİLTRELEME ─────────────────────────────────────

// durak_mı(kelime) → hızlı küme araması ile durak kelime kontrolü
durak_mı fonksiyon olsun kelime alsın {
    küçük = küçük_harf(kelime) olsun
    hızlı_içeriyor(DURAK_LISTESİ, küçük)'i döndür
}

// durak_kelime_filtrele(tokens) → durak kelimeleri çıkar
durak_kelime_filtrele fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        eleman = tokens[i] olsun
        d = durak_mı(eleman) olsun
        d = 0 ise {
            sonuç'a [eleman] ekle
        }
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ─── MODÜL 4: ÜNLÜ UYUMU ve MORFOLOJİ YARDIMCILARI ────────────────────────

// ünlü_mü(karakter) → Türkçe ünlü kontrolü
ünlü_mü fonksiyon olsun karakter alsın {
    içeriyor(TÜRKÇE_ÜNLÜLER, karakter)'i döndür
}

// kelime_ünlü_sayısı(kelime) → kelimede kaç ünlü var
kelime_ünlü_sayısı fonksiyon olsun kelime alsın {
    sayac = 0 olsun
    i = 0 olsun
    n = uzunluk(kelime) olsun
    i < n olduğu sürece {
        ünlü_mü(kelime[i]) ise {
            sayac = sayac + 1 olsun
        }
        i = i + 1 olsun
    }
    sayac'ı döndür
}

// son_ünlü(kelime) → kelimedeki son ünlü harfi bul
son_ünlü fonksiyon olsun kelime alsın {
    i = uzunluk(kelime) - 1 olsun
    i >= 0 olduğu sürece {
        ünlü_mü(kelime[i]) ise {
            kelime[i]'ni döndür
        }
        i = i - 1 olsun
    }
    ""'i döndür
}

// ünlü_uyumu_türü(kelime) → "arka" veya "ön" ünlü uyumu grubunu belirle
ünlü_uyumu_türü fonksiyon olsun kelime alsın {
    sü = son_ünlü(kelime) olsun
    // Arka ünlüler: a, ı, o, u
    (sü = "a") veya (sü = "ı") veya (sü = "o") veya (sü = "u") ise {
        "arka"'yı döndür
    }
    // Ön ünlüler: e, i, ö, ü
    "ön"'ü döndür
}

// ─── MODÜL 5: TEMEL KÖKLER BULMA (STEMMING) ────────────────────────────────
// Not: Bu, gerçek bir morfolojik analizörden daha basit, kural-tabanlı
// bir yaklaşımdır. Türkçe için derinlemesine kök bulma karmaşık olup
// bu implementasyon yaygın ekler için iyi sonuç verir.

// ek_var_mı(kelime, ek) → kelimenin sonunda bu ek var mı?
ek_var_mı fonksiyon olsun kelime, ek alsın {
    kel_boy = uzunluk(kelime) olsun
    ek_boy  = uzunluk(ek) olsun
    ek_boy >= kel_boy ise { 0'ı döndür }
    kalan = kel_boy - ek_boy olsun
    son = dizi_dilim(kelime, kalan, kel_boy) olsun
    son = ek ise { 1'i döndür }
    0'ı döndür
}

// ek_çıkar(kelime, ek) → ekiyle eşleşiyorsa eki kaldır, yoksa orijinal döndür
ek_çıkar fonksiyon olsun kelime, ek alsın {
    ek_var_mı(kelime, ek) ise {
        boy = uzunluk(kelime) - uzunluk(ek) olsun
        dizi_dilim(kelime, 0, boy)'u döndür
    }
    kelime'yi döndür
}

// stem(kelime) → en uzun eşleşen eki çıkar (tekrarlı, tam köke ulaşır)
stem fonksiyon olsun kelime alsın {
    kök = küçük_harf(kelime) olsun
    değişti = 1 olsun
    
    değişti = 1 olduğu sürece {
        değişti = 0 olsun // Bu turda değişti mi kontrolü
        
        uzunluk(kök) <= 3 ise { // En kısa yaygın kök boyutu: 3
            kök'ü döndür
        }

        i = 0 olsun
        ek_sayısı = uzunluk(ÇEKIM_EKLERİ) olsun
        i < ek_sayısı olduğu sürece {
            ek = ÇEKIM_EKLERİ[i] olsun
            ek_boy = uzunluk(ek) olsun
            kel_boy = uzunluk(kök) olsun
            
            // Ek sondan eşleşiyor ve kök en az 3 karakter kalıyor mu?
            (ek_boy < kel_boy) ve ((kel_boy - ek_boy) >= 3) ise {
                ek_var_mı(kök, ek) ise {
                    kök = dizi_dilim(kök, 0, kel_boy - ek_boy) olsun
                    değişti = 1 olsun
                    i = ek_sayısı olsun // Döngüyü kır, en baştan (uzun ekten) tekrar başla
                }
            }
            i = i + 1 olsun
        }
    }
    kök'ü döndür
}

// toplu_stem(tokens) → bir kelime listesini kökleştir
toplu_stem fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        t = tokens[i] olsun
        sonuç'a [stem(t)] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ─── MODÜL 6: TEMELSİKLİK (FREKANS) ANALİZİ ───────────────────────────────

// frekans_ekle(frek_listesi, kelime) → kelimeyi frekans listesine ekle ya da artır
// frek_listesi: [[kelime, sayı], [kelime, sayı], ...] şeklinde iç içe liste
frekans_ekle fonksiyon olsun frekanslar, kelime alsın {
    bulundu = 0 olsun
    i = 0 olsun
    n = uzunluk(frekanslar) olsun
    i < n olduğu sürece {
        çift = frekanslar[i] olsun
        çift[0] = kelime ise {
            // Doğrudan çift'in içindeki sayıyı güncelle (In-place mutation)
            çift[1] = çift[1] + 1 olsun
            bulundu = 1 olsun
            i = n olsun // Döngüden çık
        }
        i = i + 1 olsun
    }
    // Kelime listede yoksa ekle
    bulundu = 0 ise {
        yeni_çift = [kelime, 1] olsun
        frekanslar'a [yeni_çift] ekle
    }
    frekanslar'ı döndür
}

// kelime_frekansları(tokens) → token listesinden frekans listesi oluştur
kelime_frekansları fonksiyon olsun tokens alsın {
    frekanslar = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        frekanslar = frekans_ekle(frekanslar, tokens[i]) olsun
        i = i + 1 olsun
    }
    frekanslar'ı döndür
}

// ─── MODÜL 7: METİN İSTATİSTİKLERİ ────────────────────────────────────────

// metin_istatistik(metin) → temel metin istatistiklerini yazdır
metin_istatistik fonksiyon olsun metin alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "📊 Metin İstatistiği"'ni yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

    // Karakter sayısı
    kar_sayısı = uzunluk(metin) olsun
    "Karakter sayısı : " + kar_sayısı'nı yazdır

    // Kelime sayısı
    tokens = nlp_tokenize(metin) olsun
    kel_sayısı = uzunluk(tokens) olsun
    "Kelime sayısı   : " + kel_sayısı'nı yazdır

    // Cümle sayısı (nokta, !, ? ile biten kısmı say)
    cümle_s = tekrar_sayısı(metin, ".") + tekrar_sayısı(metin, "!") + tekrar_sayısı(metin, "?") olsun
    cümle_s = 0 ise { cümle_s = 1 olsun }
    "Tahmini cümle   : " + cümle_s'i yazdır

    // Benzersiz kelime sayısı
    benzersiz = durak_kelime_filtrele(tokens) olsun
    "Durak dışı tok. : " + uzunluk(benzersiz)'i yazdır

    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ─── MODÜL 8: TAM NLP BORU HATTI (PIPELINE) ────────────────────────────────
// nlp_pipeline(metin) → temizle → tokenize → durak filtre → stem → frekans

nlp_pipeline fonksiyon olsun metin alsın {
    "🚀 NLP Boru Hattı Başlıyor..."'u yazdır

    // 1. Temizlik ve Tokenizasyon
    tokens = nlp_tokenize(metin) olsun
    "✅ [1/4] Tokenizasyon: " + uzunluk(tokens) + " token"'i yazdır

    // 2. Durak kelime filtreleme
    tokens = durak_kelime_filtrele(tokens) olsun
    "✅ [2/4] Durak filtre: " + uzunluk(tokens) + " token kaldı"'i yazdır

    // 3. Kökleştirme
    kökler = toplu_stem(tokens) olsun
    "✅ [3/4] Stemming tamamlandı"'i yazdır

    // 4. Frekans analizi
    frekanslar = kelime_frekansları(kökler) olsun
    "✅ [4/4] Frekans analizi: " + uzunluk(frekanslar) + " benzersiz kök"'ü yazdır

    frekanslar'ı döndür
}

// ─── MODÜL 9: N-GRAM ÜRETIMI ───────────────────────────────────────────────

// bigram(tokens) → ardışık ikili token çiftleri üret
bigram fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    n = uzunluk(tokens) olsun
    i = 0 olsun
    i < (n - 1) olduğu sürece {
        t1 = tokens[i] olsun
        t2 = tokens[i + 1] olsun
        çift = t1 + " " + t2 olsun
        sonuç'a [çift] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// trigram(tokens) → ardışık üçlü token grupları üret
trigram fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    n = uzunluk(tokens) olsun
    i = 0 olsun
    i < (n - 2) olduğu sürece {
        t1 = tokens[i] olsun
        t2 = tokens[i + 1] olsun
        t3 = tokens[i + 2] olsun
        üçlü = t1 + " " + t2 + " " + t3 olsun
        sonuç'a [üçlü] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ngram(tokens, n) → n boyutlu gram listeleri üret (metin olarak)
ngram fonksiyon olsun tokens, n alsın {
    sonuç = [] olsun
    boy = uzunluk(tokens) olsun
    i = 0 olsun
    i < (boy - n + 1) olduğu sürece {
        gram = "" olsun
        j = 0 olsun
        j < n olduğu sürece {
            j > 0 ise {
                gram = gram + " " olsun
            }
            t = tokens[i + j] olsun
            gram = gram + t olsun
            j = j + 1 olsun
        }
        sonuç'a [gram] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ─── MODÜL 10: TÜRKÇE KARAKTER NORMALİZASYONU ──────────────────────────────

// ascii_normalize(metin) → Türkçe özel karakterleri ASCII'ye yaklaştır
// (ASCII-only sistemlerle uyumluluk için)
ascii_normalize fonksiyon olsun metin alsın {
    s = metin olsun
    s = değiştir(s, "ç", "c") olsun
    s = değiştir(s, "Ç", "C") olsun
    s = değiştir(s, "ğ", "g") olsun
    s = değiştir(s, "Ğ", "G") olsun
    s = değiştir(s, "ı", "i") olsun
    s = değiştir(s, "İ", "I") olsun
    s = değiştir(s, "ö", "o") olsun
    s = değiştir(s, "Ö", "O") olsun
    s = değiştir(s, "ş", "s") olsun
    s = değiştir(s, "Ş", "S") olsun
    s = değiştir(s, "ü", "u") olsun
    s = değiştir(s, "Ü", "U") olsun
    s'i döndür
}

// ─── SON: Yükleme Onayı ────────────────────────────────────────────────────
"[nlp.hb] Türkçe NLP kütüphanesi yüklendi ✓"'ü yazdır
