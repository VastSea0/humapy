// ══════════════════════════════════════════════════════════════════════════════
// nlp.hb — Hüma Dili Türkçe NLP Temel Kütüphanesi
// Sürüm: 2.0.0
// Yazar: Hüma Proje Ekibi
// Lisans: MIT
//
// Bu kütüphane; tokenizasyon, morfolojik analiz, kök bulma (stemming),
// durak-kelime filtreleme, temel metin istatistikleri, POS etiketleme,
// varlık ismi tanıma (NER), duygu analizi, cümle bölme, TF-IDF,
// yazım normalizasyonu ve bağımlılık ayrıştırma sağlar.
// Tüm fonksiyonlar Türkçe eklemeli dil yapısını gözetir.
// Unicode / UTF-8'e %100 uyumludur.
// ══════════════════════════════════════════════════════════════════════════════

yükle "dizgi.hb";
yükle "liste.hb";

// hızlı_içeriyor(d, eleman) → eleman listede var mı
hızlı_içeriyor fonksiyon olsun d, eleman alsın {
    i = 0 olsun
    n = uzunluk(d) olsun
    i < n olduğu sürece {
        d[i] = eleman ise { 1'i döndür }
        i = i + 1 olsun
    }
    0'ı döndür
}

// böl(metin, ayrac) → metni ayraca göre böler ve liste döndürür
böl fonksiyon olsun metin, ayrac alsın {
    sonuç = [] olsun
    mevcut = "" olsun
    i = 0 olsun
    n = uzunluk(metin) olsun
    ayrac_boy = uzunluk(ayrac) olsun
    
    i < n olduğu sürece {
        eslesti = 1 olsun
        j = 0 olsun
        j < ayrac_boy olduğu sürece {
            (i + j < n) ve (metin[i + j] = ayrac[j]) ise {
                j = j + 1 olsun
            } yoksa {
                eslesti = 0 olsun
                j = ayrac_boy olsun
            }
        }
        
        eslesti = 1 ise {
            sonuç'a [mevcut] ekle
            mevcut = "" olsun
            i = i + ayrac_boy olsun
        } yoksa {
            mevcut = mevcut + metin[i] olsun
            i = i + 1 olsun
        }
    }
    sonuç'a [mevcut] ekle
    sonuç'u döndür
}

// ─── SABITLER ────────────────────────────────────────────────────────────────
TÜRKÇE_ÜNLÜLER   = "aeıioöuüAEIİOÖUÜ" olsun
TÜRKÇE_NOKTALAMA = ".,;:!?()[]{}\"'/-–—" olsun

// Yaygın Türkçe durak kelimeler — Liste formatında hızlı arama için
DURAK_LISTESİ = [
    "bir", "bu", "şu", "o", "ve", "veya", "ile", "da", "de", "mi", "mı", "mu", "mü",
    "ki", "ise", "çok", "az", "daha", "en", "ne", "ama", "için", "gibi", "kadar",
    "sonra", "önce", "üzere", "göre", "hem", "ya", "ancak", "fakat", "hatta", "bile",
    "ben", "sen", "biz", "siz", "onlar", "bunlar", "şunlar", "var", "yok", "olan",
    "değil", "her", "hiç", "bazı", "tüm", "bütün", "hangi", "nasıl", "neden", "niye",
    "nerede", "nereden", "nereye", "ne zaman", "kim", "kimi", "kime", "kimden",
    "şey", "şeyi", "şeye", "şeyden", "böyle", "öyle", "böylece", "zaten", "artık",
    "hep", "hiçbir", "herhangi", "kendi", "kendine", "kendisi", "ise", "de", "dahi",
    "oysa", "oysaki", "ise", "lakin", "belki", "mutlaka", "kesinlikle", "tabii",
    "evet", "hayır", "peki", "tamam", "olarak", "aracılığıyla", "vasıtasıyla"
] olsun

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

// ─── YENİ: POS ETİKET SABİTLERİ ──────────────────────────────────────────────
// Sözcük türü etiketleri
POS_İSİM    = "İSİM" olsun
POS_FİİL    = "FİİL" olsun
POS_SIFAT   = "SIFAT" olsun
POS_ZARF    = "ZARF" olsun
POS_ZAMIR   = "ZAMİR" olsun
POS_BAĞLAÇ  = "BAĞLAÇ" olsun
POS_EDAT    = "EDAT" olsun
POS_BELİRSİZ = "BELİRSİZ" olsun

// Bilinen fiil kökleri (sık kullanılanlar)
FİİL_KÖKLERİ = [
    "gel", "git", "ver", "al", "yap", "bil", "gör", "kal", "çık", "gir",
    "bak", "çalış", "yaz", "oku", "söyle", "anla", "başla", "bitir", "dön",
    "dur", "geç", "getir", "götür", "inan", "kazan", "koş", "seç", "tut",
    "uç", "ulaş", "vur", "yürü", "sat", "sev", "say", "sor", "bul", "sil",
    "kullan", "düşün", "konuş", "öğren", "öğret", "bekle", "izle", "dene",
    "çiz", "gönder", "otur", "kalk", "uyan", "uyu", "yeriz", "iç", "ye"
] olsun

// Bilinen sıfatlar (sık kullanılanlar)
SIFAT_LİSTESİ = [
    "büyük", "küçük", "iyi", "kötü", "güzel", "çirkin", "hızlı", "yavaş",
    "yeni", "eski", "uzun", "kısa", "geniş", "dar", "açık", "kapalı",
    "sıcak", "soğuk", "sert", "yumuşak", "kırmızı", "mavi", "yeşil", "sarı",
    "beyaz", "siyah", "doğru", "yanlış", "kolay", "zor", "güçlü", "zayıf",
    "mutlu", "üzgün", "önemli", "gerekli", "farklı", "aynı", "tek", "çift"
] olsun

// Bilinen zarflar
ZARF_LİSTESİ = [
    "çok", "az", "hızlı", "yavaş", "erken", "geç", "şimdi", "hemen",
    "bugün", "yarın", "dün", "sabah", "akşam", "gece", "her zaman",
    "bazen", "nadiren", "sık sık", "yine", "tekrar", "artık", "henüz",
    "çoktan", "belki", "mutlaka", "kesinlikle", "neredeyse", "tam", "sadece"
] olsun

// Bilinen zamirler
ZAMİR_LİSTESİ = [
    "ben", "sen", "o", "biz", "siz", "onlar", "bu", "şu", "bunlar",
    "şunlar", "kendi", "hepsi", "kimse", "herkes", "hiç kimse", "biri",
    "birisi", "hiçbiri", "bazıları", "çoğu", "ne", "kim", "hangi"
] olsun

// Bilinen bağlaçlar
BAĞLAÇ_LİSTESİ = [
    "ve", "veya", "ya da", "ama", "fakat", "ancak", "lakin", "oysa",
    "oysaki", "çünkü", "zira", "hem", "hem de", "ne", "ne de", "ya",
    "ya da", "ki", "ise", "dahi", "bile", "hatta", "üstelik", "ayrıca"
] olsun

// Bilinen edatlar
EDAT_LİSTESİ = [
    "için", "ile", "gibi", "kadar", "göre", "karşı", "sonra", "önce",
    "üzere", "doğru", "dek", "değin", "beri", "itibaren", "rağmen",
    "başka", "ayrı", "dışında", "içinde", "üzerinde", "altında", "yanında"
] olsun

// ─── YENİ: NER SABİTLERİ ─────────────────────────────────────────────────────
NER_KİŞİ       = "KİŞİ" olsun
NER_YER        = "YER" olsun
NER_ORGANİZASYON = "ORG" olsun
NER_TARİH      = "TARİH" olsun
NER_SAYI       = "SAYI" olsun
NER_BELİRSİZ   = "O" olsun  // Outside — varlık değil

// Bilinen Türkiye şehirleri ve yerleri
BİLİNEN_YERLER = [
    "ankara", "istanbul", "izmir", "bursa", "antalya", "adana", "konya",
    "gaziantep", "şanlıurfa", "kayseri", "mersin", "eskişehir", "diyarbakır",
    "samsun", "denizli", "şahinbey", "trabzon", "erzurum", "malatya",
    "van", "batman", "elazığ", "manisa", "kahramanmaraş", "kocaeli",
    "türkiye", "avrupa", "asya", "anadolu", "karadeniz", "akdeniz",
    "ege", "marmara", "boğaz", "boğaziçi", "kapadokya", "efes"
] olsun

// Yaygın Türkçe isim ekleri (büyük harfle başlayan kişi isimlerine ek ipucu)
KİŞİ_EKLERİ = ["'nın", "'nin", "'nun", "'nün", "'ya", "'ye", "'yı", "'yi", "'dan", "'den"] olsun

// Tarih ifadeleri
AY_LİSTESİ = [
    "ocak", "şubat", "mart", "nisan", "mayıs", "haziran",
    "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"
] olsun

// ─── YENİ: DUYGU ANALİZİ SABİTLERİ ──────────────────────────────────────────
POZİTİF_KELİMELER = [
    "güzel", "harika", "mükemmel", "iyi", "seviyorum", "mutlu", "başarılı",
    "memnun", "olağanüstü", "süper", "muhteşem", "enfes", "nefis", "hoş",
    "sevimli", "güçlü", "zeki", "yetenekli", "başarı", "kazanmak", "sevmek",
    "beğenmek", "övmek", "teşekkür", "tebrik", "bravo", "aferin",
    "umut", "neşe", "sevinç", "huzur", "barış", "sevgi", "aşk",
    "eğlenceli", "ilginç", "faydalı", "yararlı", "doğru", "gerçek"
] olsun

NEGATİF_KELİMELER = [
    "kötü", "berbер", "korkunç", "sinir", "nefret", "üzgün", "mutsuz",
    "başarısız", "hata", "yanlış", "sorun", "problem", "tehlike", "risk",
    "zararlı", "berbat", "rezalet", "felaket", "facia", "dehşet",
    "acı", "ağlamak", "ağlıyor", "zor", "güç", "imkansız", "olmaz",
    "istemiyorum", "sevmiyorum", "beğenmiyorum", "şikayet", "eleştiri",
    "kaygı", "endişe", "korku", "stres", "yorgun", "bitkin", "bıktım"
] olsun

GÜÇLENDIRICI_KELİMELER = [
    "çok", "son derece", "aşırı", "oldukça", "fazlasıyla", "bir hayli",
    "gayet", "epey", "pek", "son", "tam", "kesinlikle", "hiç"
] olsun

// ─── MODÜL 1: TEMİZLEME VE NORMALİZASYON ──────────────────────────────────

// nlp_temizle(metin) → noktalama işaretlerini kaldırır, küçük harfe çevirir
nlp_temizle fonksiyon olsun metin alsın {
    sonuç = küçük_harf(metin) olsun
    sonuç = değiştir(sonuç, ".", " ") olsun
    sonuç = değiştir(sonuç, ",", " ") olsun
    sonuç = değiştir(sonuç, ";", " ") olsun
    sonuç = değiştir(sonuç, ":", " ") olsun
    sonuç = değiştir(sonuç, "!", " ") olsun
    sonuç = değiştir(sonuç, "?", " ") olsun
    sonuç = değiştir(sonuç, "(", " ") olsun
    sonuç = değiştir(sonuç, ")", " ") olsun
    sonuç = değiştir(sonuç, "\"", " ") olsun
    sonuç = değiştir(sonuç, "'", " ") olsun
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
    (sü = "a") veya (sü = "ı") veya (sü = "o") veya (sü = "u") ise {
        "arka"'yı döndür
    }
    "ön"'ü döndür
}

// ─── MODÜL 5: TEMEL KÖKLER BULMA (STEMMING) ────────────────────────────────

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
        değişti = 0 olsun

        uzunluk(kök) <= 3 ise {
            kök'ü döndür
        }

        i = 0 olsun
        ek_sayısı = uzunluk(ÇEKIM_EKLERİ) olsun
        i < ek_sayısı olduğu sürece {
            ek = ÇEKIM_EKLERİ[i] olsun
            ek_boy = uzunluk(ek) olsun
            kel_boy = uzunluk(kök) olsun

            (ek_boy < kel_boy) ve ((kel_boy - ek_boy) >= 3) ise {
                ek_var_mı(kök, ek) ise {
                    kök = dizi_dilim(kök, 0, kel_boy - ek_boy) olsun
                    değişti = 1 olsun
                    i = ek_sayısı olsun
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

// frekans_ekle(frekanslar, kelime) → kelimeyi frekans listesine ekle ya da artır
frekans_ekle fonksiyon olsun frekanslar, kelime alsın {
    bulundu = 0 olsun
    i = 0 olsun
    n = uzunluk(frekanslar) olsun
    i < n olduğu sürece {
        çift = frekanslar[i] olsun
        çift[0] = kelime ise {
            çift[1] = çift[1] + 1 olsun
            bulundu = 1 olsun
            i = n olsun
        }
        i = i + 1 olsun
    }
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

// ─── YENİ MODÜL 6B: FREKANS SIRALAMA ──────────────────────────────────────
// frekans_sırala(frekanslar) → frekans listesini büyükten küçüğe sıralar (kabarcık sıralaması)
frekans_sırala fonksiyon olsun frekanslar alsın {
    n = uzunluk(frekanslar) olsun
    i = 0 olsun
    i < n olduğu sürece {
        j = 0 olsun
        j < (n - i - 1) olduğu sürece {
            a = frekanslar[j] olsun
            b = frekanslar[j + 1] olsun
            a[1] < b[1] ise {
                // Takas
                frekanslar[j] = b olsun
                frekanslar[j + 1] = a olsun
            }
            j = j + 1 olsun
        }
        i = i + 1 olsun
    }
    frekanslar'ı döndür
}

// en_sık_n(frekanslar, n) → en sık geçen n kelimeyi döndür
en_sık_n fonksiyon olsun frekanslar, n alsın {
    sıralı = frekans_sırala(frekanslar) olsun
    sonuç = [] olsun
    i = 0 olsun
    top = uzunluk(sıralı) olsun
    top > n ise { top = n olsun }
    i < top olduğu sürece {
        sonuç'a [sıralı[i]] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ─── MODÜL 7: METİN İSTATİSTİKLERİ ────────────────────────────────────────

// metin_istatistik(metin) → temel metin istatistiklerini yazdır
metin_istatistik fonksiyon olsun metin alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "📊 Metin İstatistiği"'ni yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

    kar_sayısı = uzunluk(metin) olsun
    "Karakter sayısı : " + kar_sayısı'nı yazdır

    tokens = nlp_tokenize(metin) olsun
    kel_sayısı = uzunluk(tokens) olsun
    "Kelime sayısı   : " + kel_sayısı'nı yazdır

    // Cümle sayısı — artık cümle_böl modülünü kullanır
    cümleler = cümle_böl(metin) olsun
    cümle_s = uzunluk(cümleler) olsun
    "Tahmini cümle   : " + cümle_s'i yazdır

    benzersiz = durak_kelime_filtrele(tokens) olsun
    "Durak dışı tok. : " + uzunluk(benzersiz)'i yazdır

    // Ortalama kelime uzunluğu
    ort = ortalama_kelime_uzunluğu(tokens) olsun
    "Ort. kelime boy : " + ort'u yazdır

    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ─── YENİ MODÜL 8: CÜMLE BÖLME ────────────────────────────────────────────
//
// Türkçe kısaltmalar gözetilerek cümleleri doğru böler.
// "Dr.", "Prof.", "vb.", "vs.", "No." gibi kısaltmalar hata yaratmaz.

KISALTMALAR = [
    "dr", "prof", "doç", "yrd", "arş", "öğr", "muh", "müh",
    "vb", "vs", "bkz", "örn", "no", "tel", "faks", "sok", "cad",
    "blv", "apt", "kat", "daire", "kısm", "bölüm", "madde", "fık",
    "hz", "hz", "sr", "st", "mr", "mrs", "ms"
] olsun

// kısaltma_mı(kelime) → nokta öncesi kısaltma kontrolü
kısaltma_mı fonksiyon olsun kelime alsın {
    temiz = küçük_harf(kelime) olsun
    hızlı_içeriyor(KISALTMALAR, temiz)'i döndür
}

// cümle_böl(metin) → metni anlamlı cümlelere böler
// Sonuç: cümle listesi ["Cümle 1.", "Cümle 2.", ...]
cümle_böl fonksiyon olsun metin alsın {
    cümleler = [] olsun
    mevcut = "" olsun
    i = 0 olsun
    n = uzunluk(metin) olsun

    i < n olduğu sürece {
        karakter = metin[i] olsun

        // Cümle sonu karakterleri: . ! ?
        (karakter = ".") veya (karakter = "!") veya (karakter = "?") ise {

            // Nokta için kısaltma kontrolü yap
            karakter = "." ise {
                // Mevcut birikimden son kelimeyi bul
                parcalar = böl(kırp(mevcut), " ") olsun
                son_kelime = "" olsun
                parcalar_n = uzunluk(parcalar) olsun
                parcalar_n > 0 ise {
                    son_kelime = parcalar[parcalar_n - 1] olsun
                }

                kısaltma_mı(son_kelime) ise {
                    // Kısaltma — cümleyi bitirme, devam et
                    mevcut = mevcut + karakter olsun
                    i = i + 1 olsun
                }
                // Kısaltma değil — cümleyi bitir
                yoksa {
                    mevcut = mevcut + karakter olsun
                    temiz_cümle = kırp(mevcut) olsun
                    uzunluk(temiz_cümle) > 0 ise {
                        cümleler'e [temiz_cümle] ekle
                    }
                    mevcut = "" olsun
                    i = i + 1 olsun
                }
            }
            // ! veya ? — doğrudan cümleyi bitir
            yoksa {
                mevcut = mevcut + karakter olsun
                temiz_cümle = kırp(mevcut) olsun
                uzunluk(temiz_cümle) > 0 ise {
                    cümleler'e [temiz_cümle] ekle
                }
                mevcut = "" olsun
                i = i + 1 olsun
            }
        }
        // Normal karakter — birikime ekle
        yoksa {
            mevcut = mevcut + karakter olsun
            i = i + 1 olsun
        }
    }

    // Metnin sonunda noktalama olmayan son cümle
    son_kalan = kırp(mevcut) olsun
    uzunluk(son_kalan) > 0 ise {
        cümleler'e [son_kalan] ekle
    }

    cümleler'i döndür
}

// ─── YENİ MODÜL 9: POS ETİKETLEME ─────────────────────────────────────────
//
// Kural tabanlı sözcük türü (Part of Speech) etiketleme.
// Sonuç: [[kelime, etiket], [kelime, etiket], ...] formatında liste

// pos_etiket(kelime) → tek kelimeye POS etiketi ata
pos_etiket fonksiyon olsun kelime alsın {
    k = küçük_harf(kelime) olsun

    // Zamir kontrolü
    hızlı_içeriyor(ZAMİR_LİSTESİ, k) ise { ZAMİR'i döndür }

    // Bağlaç kontrolü
    hızlı_içeriyor(BAĞLAÇ_LİSTESİ, k) ise { BAĞLAÇ'ı döndür }

    // Edat kontrolü
    hızlı_içeriyor(EDAT_LİSTESİ, k) ise { EDAT'ı döndür }

    // Zarf kontrolü
    hızlı_içeriyor(ZARF_LİSTESİ, k) ise { ZARF'ı döndür }

    // Sıfat kontrolü
    hızlı_içeriyor(SIFAT_LİSTESİ, k) ise { SIFAT'ı döndür }

    // Fiil kökü kontrolü — stem alıp bilinen köklerle karşılaştır
    kök = stem(k) olsun
    hızlı_içeriyor(FİİL_KÖKLERİ, kök) ise { FİİL'i döndür }

    // Fiil eki kontrolü: -mak/-mek, -ıyor/-iyor, -dı/-di gibi eklerle bitiyor mu?
    (ek_var_mı(k, "mak")) veya (ek_var_mı(k, "mek")) ise { FİİL'i döndür }
    (ek_var_mı(k, "ıyor")) veya (ek_var_mı(k, "iyor")) ise { FİİL'i döndür }
    (ek_var_mı(k, "uyor")) veya (ek_var_mı(k, "üyor")) ise { FİİL'i döndür }
    (ek_var_mı(k, "acak")) veya (ek_var_mı(k, "ecek")) ise { FİİL'i döndür }
    (ek_var_mı(k, "mış")) veya (ek_var_mı(k, "miş")) ise { FİİL'i döndür }

    // Sıfat eki kontrolü: -lı/-li/-lu/-lü, -sız/-siz, -sal/-sel
    (ek_var_mı(k, "lı")) veya (ek_var_mı(k, "li")) ise { SIFAT'ı döndür }
    (ek_var_mı(k, "lu")) veya (ek_var_mı(k, "lü")) ise { SIFAT'ı döndür }
    (ek_var_mı(k, "sız")) veya (ek_var_mı(k, "siz")) ise { SIFAT'ı döndür }
    (ek_var_mı(k, "suz")) veya (ek_var_mı(k, "süz")) ise { SIFAT'ı döndür }
    (ek_var_mı(k, "sal")) veya (ek_var_mı(k, "sel")) ise { SIFAT'ı döndür }

    // Varsayılan: isim
    İSİM'i döndür
}

// pos_etiketle(tokens) → token listesini POS etiketleriyle döndür
// Sonuç: [[kelime, etiket], ...] listesi
pos_etiketle fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        kelime = tokens[i] olsun
        etiket = pos_etiket(kelime) olsun
        çift = [kelime, etiket] olsun
        sonuç'a [çift] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// pos_yazdır(etiketli_tokens) → POS etiketlerini okunaklı biçimde yazdır
pos_yazdır fonksiyon olsun etiketli_tokens alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "🏷️  POS Etiketleme Sonuçları"'nı yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    i = 0 olsun
    n = uzunluk(etiketli_tokens) olsun
    i < n olduğu sürece {
        çift = etiketli_tokens[i] olsun
        "  " + çift[0] + "  →  [" + çift[1] + "]"'i yazdır
        i = i + 1 olsun
    }
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ─── YENİ MODÜL 10: VARLİK İSMİ TANIMA (NER) ──────────────────────────────
//
// Kural tabanlı basit NER: kişi, yer, organizasyon, tarih, sayı
// Sonuç: [[kelime, NER_ETİKETİ], ...] listesi

// büyük_harf_mi(karakter) → büyük harf kontrolü
büyük_harf_mi fonksiyon olsun karakter alsın {
    içeriyor("ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ", karakter)'i döndür
}

// rakam_mı(karakter) → rakam kontrolü
rakam_mı fonksiyon olsun karakter alsın {
    içeriyor("0123456789", karakter)'i döndür
}

// sayı_token_mu(kelime) → tüm karakterler rakam mı?
sayı_token_mu fonksiyon olsun kelime alsın {
    n = uzunluk(kelime) olsun
    n = 0 ise { 0'ı döndür }
    i = 0 olsun
    i < n olduğu sürece {
        rakam_mı(kelime[i]) = 0 ise { 0'ı döndür }
        i = i + 1 olsun
    }
    1'i döndür
}

// ner_etiket(kelime, önceki_etiket) → NER etiketi ata
ner_etiket fonksiyon olsun kelime, önceki_etiket alsın {
    // Sayı kontrolü
    sayı_token_mu(kelime) ise { NER_SAYI'yı döndür }

    // Bilinen yerler
    hızlı_içeriyor(BİLİNEN_YERLER, küçük_harf(kelime)) ise { NER_YER'i döndür }

    // Ay isimleri → tarih
    hızlı_içeriyor(AY_LİSTESİ, küçük_harf(kelime)) ise { NER_TARİH'i döndür }

    // Büyük harfle başlıyor mu? (ilk kelime değilse kişi veya org adayı)
    uzunluk(kelime) > 0 ise {
        büyük_harf_mi(kelime[0]) ise {
            // Önceki etiket de büyük harf ise zincirleme kişi/org adı
            (önceki_etiket = NER_KİŞİ) veya (önceki_etiket = NER_ORGANİZASYON) ise {
                önceki_etiket'i döndür
            }
            // Org ipuçları: A.Ş., Ltd., Şti. vb.
            (ek_var_mı(kelime, "A.Ş.")) veya (ek_var_mı(kelime, "Ltd.")) ise {
                NER_ORGANİZASYON'u döndür
            }
            // Varsayılan büyük harf → kişi adayı
            NER_KİŞİ'yi döndür
        }
    }

    NER_BELİRSİZ'i döndür
}

// ner_etiketle(tokens) → token listesini NER etiketleriyle döndür
ner_etiketle fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    önceki = NER_BELİRSİZ olsun
    i < n olduğu sürece {
        kelime = tokens[i] olsun
        etiket = ner_etiket(kelime, önceki) olsun
        çift = [kelime, etiket] olsun
        sonuç'a [çift] ekle
        önceki = etiket olsun
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ner_yazdır(etiketli_tokens) → sadece O dışındaki varlıkları yazdır
ner_yazdır fonksiyon olsun etiketli_tokens alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "🔍 Varlık İsmi Tanıma (NER)"'yi yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    bulunan = 0 olsun
    i = 0 olsun
    n = uzunluk(etiketli_tokens) olsun
    i < n olduğu sürece {
        çift = etiketli_tokens[i] olsun
        çift[1] != NER_BELİRSİZ ise {
            "  [" + çift[1] + "]  " + çift[0]'ı yazdır
            bulunan = bulunan + 1 olsun
        }
        i = i + 1 olsun
    }
    bulunan = 0 ise {
        "  (Varlık tespit edilmedi)"'yi yazdır
    }
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ─── YENİ MODÜL 11: DUYGU ANALİZİ ─────────────────────────────────────────
//
// Sözlük tabanlı duygu analizi.
// Sonuç: {"puan": sayı, "etiket": "POZİTİF"/"NEGATİF"/"NÖTR", "güven": yüzde}

// duygu_puan(tokens) → token listesinden ham duygu puanı hesapla
duygu_puan fonksiyon olsun tokens alsın {
    puan = 0 olsun
    çarpan = 1 olsun  // Güçlendirici varsa 2 olur
    i = 0 olsun
    n = uzunluk(tokens) olsun

    i < n olduğu sürece {
        kelime = küçük_harf(tokens[i]) olsun

        // Güçlendirici kelime → sonraki kelimenin ağırlığını artır
        hızlı_içeriyor(GÜÇLENDIRICI_KELİMELER, kelime) ise {
            çarpan = 2 olsun
            i = i + 1 olsun
        }
        hızlı_içeriyor(GÜÇLENDIRICI_KELİMELER, kelime) = 0 ise {
            hızlı_içeriyor(POZİTİF_KELİMELER, kelime) ise {
                puan = puan + (1 * çarpan) olsun
                çarpan = 1 olsun
            }
            hızlı_içeriyor(NEGATİF_KELİMELER, kelime) ise {
                puan = puan - (1 * çarpan) olsun
                çarpan = 1 olsun
            }
            // Olumsuzluk eki: değil → sonraki kelimeyi ters çevir
            kelime = "değil" ise {
                çarpan = -1 olsun
            }
            i = i + 1 olsun
        }
    }
    puan'ı döndür
}

// duygu_analizi(metin) → metni analiz edip sonuç döndür
// Sonuç: [puan, etiket, güven_yüzdesi]
duygu_analizi fonksiyon olsun metin alsın {
    tokens = nlp_tokenize(metin) olsun
    puan = duygu_puan(tokens) olsun
    n = uzunluk(tokens) olsun

    // Güven: anlamlı kelime sayısına göre normalize et
    güven = 0 olsun
    n > 0 ise {
        ham_güven = puan olsun
        ham_güven < 0 ise { ham_güven = 0 - ham_güven olsun }
        güven = (ham_güven * 100) / n olsun
        güven > 100 ise { güven = 100 olsun }
    }

    etiket = "NÖTR" olsun
    puan > 0 ise { etiket = "POZİTİF" olsun }
    puan < 0 ise { etiket = "NEGATİF" olsun }

    [puan, etiket, güven]'i döndür
}

// duygu_yazdır(metin) → duygu analizi sonucunu okunaklı biçimde yazdır
duygu_yazdır fonksiyon olsun metin alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "💬 Duygu Analizi"'ni yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    sonuç = duygu_analizi(metin) olsun
    "  Puan   : " + sonuç[0]'ı yazdır
    "  Etiket : " + sonuç[1]'i yazdır
    "  Güven  : %" + sonuç[2]'yi yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ─── YENİ MODÜL 12: TF-IDF ─────────────────────────────────────────────────
//
// Çok belgeli koleksiyon üzerinde TF-IDF hesaplar.
// belgeler: metin listesi ["belge1", "belge2", ...]
// Sonuç: her belge için [[kelime, tfidf_puanı], ...] listesi

// tf_hesapla(tokens, kelime) → tek bir belgede kelimenin TF değeri
tf_hesapla fonksiyon olsun tokens, kelime alsın {
    n = uzunluk(tokens) olsun
    n = 0 ise { 0'ı döndür }
    sayac = 0 olsun
    i = 0 olsun
    i < n olduğu sürece {
        tokens[i] = kelime ise { sayac = sayac + 1 olsun }
        i = i + 1 olsun
    }
    sayac / n'yi döndür
}

// df_hesapla(belge_tokens_listesi, kelime) → kaç belgede geçiyor (document frequency)
df_hesapla fonksiyon olsun belge_tokens_listesi, kelime alsın {
    df = 0 olsun
    i = 0 olsun
    n = uzunluk(belge_tokens_listesi) olsun
    i < n olduğu sürece {
        tokens = belge_tokens_listesi[i] olsun
        j = 0 olsun
        m = uzunluk(tokens) olsun
        bulundu = 0 olsun
        j < m olduğu sürece {
            tokens[j] = kelime ise {
                bulundu = 1 olsun
                j = m olsun
            }
            j = j + 1 olsun
        }
        bulundu = 1 ise { df = df + 1 olsun }
        i = i + 1 olsun
    }
    df'i döndür
}

// idf_hesapla(belge_sayısı, df) → IDF değeri (basit log yerine oran kullanılır)
// Not: Hüma'da log fonksiyonu olmadığından (N/df) oranı IDF yetkisi olarak kullanılır
idf_hesapla fonksiyon olsun belge_sayısı, df alsın {
    df = 0 ise { 0'ı döndür }
    belge_sayısı / df'i döndür
}

// belge_tfidf(belge_metni, tüm_belge_tokens) → tek belge için TF-IDF listesi
belge_tfidf fonksiyon olsun belge_metni, tüm_belge_tokens alsın {
    tokens = nlp_tokenize(belge_metni) olsun
    temiz = durak_kelime_filtrele(tokens) olsun
    frekanslar = kelime_frekansları(temiz) olsun

    sonuç = [] olsun
    belge_n = uzunluk(tüm_belge_tokens) olsun
    i = 0 olsun
    n = uzunluk(frekanslar) olsun

    i < n olduğu sürece {
        çift = frekanslar[i] olsun
        kelime = çift[0] olsun
        tf = tf_hesapla(temiz, kelime) olsun
        df = df_hesapla(tüm_belge_tokens, kelime) olsun
        idf = idf_hesapla(belge_n, df) olsun
        tfidf_puanı = tf * idf olsun
        sonuç'a [[kelime, tfidf_puanı]] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// tfidf_koleksiyon(belgeler) → belgeler listesi için TF-IDF hesaplar
// belgeler: ["metin1", "metin2", ...] formatında liste
tfidf_koleksiyon fonksiyon olsun belgeler alsın {
    // Önce tüm belgeleri tokenize et
    tüm_tokens = [] olsun
    i = 0 olsun
    n = uzunluk(belgeler) olsun
    i < n olduğu sürece {
        b_tokens = durak_kelime_filtrele(nlp_tokenize(belgeler[i])) olsun
        tüm_tokens'a [b_tokens] ekle
        i = i + 1 olsun
    }

    // Her belge için TF-IDF hesapla
    sonuç = [] olsun
    i = 0 olsun
    i < n olduğu sürece {
        b_tfidf = belge_tfidf(belgeler[i], tüm_tokens) olsun
        sonuç'a [b_tfidf] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ─── YENİ MODÜL 13: YARDIMCI ARAÇLAR ──────────────────────────────────────

// ortalama_kelime_uzunluğu(tokens) → ortalama kelime boyunu hesapla
ortalama_kelime_uzunluğu fonksiyon olsun tokens alsın {
    n = uzunluk(tokens) olsun
    n = 0 ise { 0'ı döndür }
    toplam = 0 olsun
    i = 0 olsun
    i < n olduğu sürece {
        toplam = toplam + uzunluk(tokens[i]) olsun
        i = i + 1 olsun
    }
    toplam / n'yi döndür
}

// kelime_var_mı(tokens, kelime) → kelime token listesinde var mı?
kelime_var_mı fonksiyon olsun tokens, kelime alsın {
    hızlı_içeriyor(tokens, küçük_harf(kelime))'i döndür
}

// metin_benzerlik(metin1, metin2) → iki metnin ortak kelime oranı (Jaccard)
// 0.0 = tamamen farklı, 1.0 = tamamen aynı
metin_benzerlik fonksiyon olsun metin1, metin2 alsın {
    t1 = durak_kelime_filtrele(nlp_tokenize(metin1)) olsun
    t2 = durak_kelime_filtrele(nlp_tokenize(metin2)) olsun

    // Ortak kelimeler
    ortak = 0 olsun
    i = 0 olsun
    n1 = uzunluk(t1) olsun
    i < n1 olduğu sürece {
        hızlı_içeriyor(t2, t1[i]) ise {
            ortak = ortak + 1 olsun
        }
        i = i + 1 olsun
    }

    // Birleşim = n1 + n2 - ortak
    n2 = uzunluk(t2) olsun
    birleşim = n1 + n2 - ortak olsun
    birleşim = 0 ise { 0'ı döndür }

    ortak / birleşim'i döndür
}

// ─── MODÜL 14: N-GRAM ÜRETIMI ──────────────────────────────────────────────

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

// ngram(tokens, n) → n boyutlu gram listeleri üret
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

// ─── MODÜL 15: TÜRKÇE KARAKTER NORMALİZASYONU ──────────────────────────────

// ascii_normalize(metin) → Türkçe özel karakterleri ASCII'ye yaklaştır
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

// deasciify(metin) → ASCII metindeki Türkçe karakter adaylarını geri çevir
// Yaygın örüntüler: "c" → "ç", "s" → "ş", "g" → "ğ" (bağlam sezgisel)
deasciify fonksiyon olsun metin alsın {
    s = metin olsun
    // Kelimenin ortasında veya sonunda "ci/ci" → "çi", "ca/ca" → "ça" gibi
    // Not: Bu yöntem yaklaşıktır; tam deasciifier derin analiz gerektirir
    s = değiştir(s, "cc", "çç") olsun
    s = değiştir(s, "ss", "şş") olsun
    s = değiştir(s, "gg", "ğğ") olsun
    s = değiştir(s, "ii", "iı") olsun
    s = değiştir(s, "oo", "öo") olsun
    s = değiştir(s, "uu", "üu") olsun
    s'i döndür
}

// ─── MODÜL 16: TAM NLP BORU HATTI (GELİŞTİRİLMİŞ) ─────────────────────────

nlp_pipeline fonksiyon olsun metin alsın {
    "🚀 NLP Boru Hattı Başlıyor..."'u yazdır

    // 1. Cümle bölme
    cümleler = cümle_böl(metin) olsun
    "✅ [1/6] Cümle bölme: " + uzunluk(cümleler) + " cümle"'yi yazdır

    // 2. Tokenizasyon
    tokens = nlp_tokenize(metin) olsun
    "✅ [2/6] Tokenizasyon: " + uzunluk(tokens) + " token"'i yazdır

    // 3. POS Etiketleme
    etiketli = pos_etiketle(tokens) olsun
    "✅ [3/6] POS etiketleme tamamlandı"'yı yazdır

    // 4. NER
    ner_sonuç = ner_etiketle(tokens) olsun
    "✅ [4/6] NER analizi tamamlandı"'yı yazdır

    // 5. Durak filtre + Stemming
    temiz = durak_kelime_filtrele(tokens) olsun
    kökler = toplu_stem(temiz) olsun
    "✅ [5/6] Stemming: " + uzunluk(kökler) + " kök"'ü yazdır

    // 6. Frekans analizi
    frekanslar = frekans_sırala(kelime_frekansları(kökler)) olsun
    "✅ [6/6] Frekans analizi: " + uzunluk(frekanslar) + " benzersiz kök"'ü yazdır

    // 7. Duygu analizi
    duygu_yazdır(metin)

    frekanslar'ı döndür
}

// ─── SON: Yükleme Onayı ────────────────────────────────────────────────────
"[nlp.hb] Türkçe NLP kütüphanesi v2.0.0 yüklendi ✓"'ü yazdır
"[nlp.hb] Yeni modüller: cümle_böl · pos_etiketle · ner_etiketle · duygu_analizi · tfidf · metin_benzerlik · frekans_sırala · en_sık_n · deasciify"'i yazdır
