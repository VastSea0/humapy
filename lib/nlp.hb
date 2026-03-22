// ══════════════════════════════════════════════════════════════════════════════
// nlp.hb — Hüma Dili Türkçe NLP Kütüphanesi
// Sürüm: 3.0.0
// Lisans: MIT
//
// DEĞİŞİKLİKLER (v3.0.0):
//   - "değilse" tamamen kaldırıldı → bayrak değişkeni pattern'i kullanıldı
//   - "/" ve "*" operatörleri kaldırıldı → tam sayı tabanlı skorlara geçildi
//   - nlp_temizle içine kesme işareti "'" temizliği eklendi
//   - cümle_böl sıfırdan bayrak tabanlı yeniden yazıldı
//   - duygu_yazdır doğrudan yazdır çağrılarına dönüştürüldü
//   - pos_etiket / ner_etiket bayrak zinciriyle yeniden yazıldı
// ══════════════════════════════════════════════════════════════════════════════

yükle "dizgi.hb";
yükle "liste.hb";

// ─── SABİTLER ────────────────────────────────────────────────────────────────

TÜRKÇE_ÜNLÜLER = "aeıioöuüAEIİOÖUÜ" olsun

DURAK_LISTESİ = [
    "bir", "bu", "şu", "o", "ve", "veya", "ile", "da", "de", "mi", "mı", "mu", "mü",
    "ki", "ise", "çok", "az", "daha", "en", "ne", "ama", "için", "gibi", "kadar",
    "sonra", "önce", "üzere", "göre", "hem", "ya", "ancak", "fakat", "hatta", "bile",
    "ben", "sen", "biz", "siz", "onlar", "bunlar", "şunlar", "var", "yok", "olan",
    "değil", "her", "hiç", "bazı", "tüm", "bütün", "hangi", "nasıl", "neden", "niye",
    "nerede", "nereden", "nereye", "kim", "kimi", "kime", "kimden",
    "şey", "şeyi", "şeye", "şeyden", "böyle", "öyle", "böylece", "zaten", "artık",
    "hep", "hiçbir", "herhangi", "kendi", "kendine", "kendisi", "dahi",
    "oysa", "oysaki", "lakin", "belki", "mutlaka", "kesinlikle", "tabii",
    "evet", "hayır", "peki", "tamam", "olarak", "aracılığıyla", "vasıtasıyla"
] olsun

ÇEKIM_EKLERİ = [
    "ştırmak", "ştirmek", "laştır", "leştir", "abilmek", "ebilmek", "abilir", "ebilir",
    "acaklar", "ecekler", "acaktı", "ecekti", "maktan", "mekten", "makta", "mekte",
    "dıkça", "dikçe", "dukça", "dükçe", "tıkça", "tikçe", "tukça", "tükçe",
    "yacak", "yecek", "arak", "erek", "ınca", "ince", "unca", "ünce", "madan", "meden",
    "mıştı", "mişti", "muştu", "müştü", "tıydı", "tiydi", "tuydı", "tüydü",
    "ıyor", "iyor", "uyor", "üyor", "acak", "ecek", "ardı", "erdi", "ırdı", "irdi",
    "mış", "miş", "muş", "müş", "tık", "tik", "tuk", "tük", "dık", "dik", "duk", "dük",
    "lar", "ler", "mak", "mek", "ken",
    "lardan", "lerden", "larla", "lerle", "ından", "inden", "undan", "ünden",
    "ların", "lerin", "ndaki", "ndeki", "daki", "deki", "taki", "teki",
    "dan", "den", "tan", "ten", "nda", "nde", "nın", "nin", "nun", "nün",
    "na", "ne", "nı", "ni", "nu", "nü",
    "da", "de", "ta", "te", "ya", "ye", "yı", "yi", "yu", "yü",
    "ımız", "imiz", "umuz", "ümüz", "ınız", "iniz", "unuz", "ünüz", "mız", "miz", "nız", "niz",
    "ları", "leri", "sın", "sin", "sun", "sün",
    "dı", "di", "du", "dü", "tı", "ti", "tu", "tü", "sa", "se", "ma", "me",
    "ar", "er", "ır", "ir", "ur", "ür", "ıp", "ip", "up", "üp",
    "ın", "in", "un", "ün", "ım", "im", "um", "üm", "am", "em",
    "ı", "i", "u", "ü", "a", "e"
] olsun

// ─── POS SABİTLERİ ────────────────────────────────────────────────────────────

POS_İSİM     = "İSİM" olsun
POS_FİİL     = "FİİL" olsun
POS_SIFAT    = "SIFAT" olsun
POS_ZARF     = "ZARF" olsun
POS_ZAMİR    = "ZAMİR" olsun
POS_BAĞLAÇ   = "BAĞLAÇ" olsun
POS_EDAT     = "EDAT" olsun
POS_BELİRSİZ = "?" olsun

FİİL_KÖKLERİ = [
    "gel", "git", "ver", "al", "yap", "bil", "gör", "kal", "çık", "gir",
    "bak", "çalış", "yaz", "oku", "söyle", "anla", "başla", "bitir", "dön",
    "dur", "geç", "getir", "götür", "inan", "kazan", "koş", "seç", "tut",
    "uç", "ulaş", "vur", "yürü", "sat", "sev", "say", "sor", "bul", "sil",
    "kullan", "düşün", "konuş", "öğren", "öğret", "bekle", "izle", "dene",
    "çiz", "gönder", "otur", "kalk", "uyan", "uyu", "iç", "ye", "kur",
    "geliş", "geliştir", "ilerle", "katıl", "sun", "üret"
] olsun

SIFAT_LİSTESİ = [
    "büyük", "küçük", "iyi", "kötü", "güzel", "çirkin", "hızlı", "yavaş",
    "yeni", "eski", "uzun", "kısa", "geniş", "dar", "açık", "kapalı",
    "sıcak", "soğuk", "sert", "yumuşak", "kırmızı", "mavi", "yeşil", "sarı",
    "beyaz", "siyah", "doğru", "yanlış", "kolay", "zor", "güçlü", "zayıf",
    "mutlu", "üzgün", "önemli", "gerekli", "farklı", "aynı", "tek", "çift",
    "yapay", "gerçek", "dijital", "modern", "temel"
] olsun

ZARF_LİSTESİ = [
    "hızla", "yavaşça", "erken", "geç", "şimdi", "hemen", "bugün", "yarın",
    "dün", "sabah", "akşam", "gece", "bazen", "nadiren", "yine", "tekrar",
    "neredeyse", "tam", "sadece", "çoktan", "henüz", "artık", "zaten"
] olsun

ZAMİR_LİSTESİ = [
    "ben", "sen", "o", "biz", "siz", "onlar", "bu", "şu", "bunlar", "şunlar",
    "kendi", "hepsi", "kimse", "herkes", "biri", "birisi", "hiçbiri", "bazıları"
] olsun

BAĞLAÇ_LİSTESİ = [
    "ve", "veya", "ama", "fakat", "ancak", "lakin", "oysa", "oysaki",
    "çünkü", "zira", "hem", "ne", "ya", "ki", "dahi", "bile", "hatta",
    "üstelik", "ayrıca", "yoksa", "madem", "eğer"
] olsun

EDAT_LİSTESİ = [
    "için", "ile", "gibi", "kadar", "göre", "karşı", "sonra", "önce",
    "üzere", "doğru", "dek", "değin", "beri", "rağmen", "başka",
    "dışında", "içinde", "üzerinde", "altında", "yanında", "üzerine"
] olsun

// ─── NER SABİTLERİ ────────────────────────────────────────────────────────────

NER_KİŞİ  = "KİŞİ" olsun
NER_YER   = "YER" olsun
NER_ORG   = "ORG" olsun
NER_TARİH = "TARİH" olsun
NER_SAYI  = "SAYI" olsun
NER_O     = "O" olsun

BİLİNEN_YERLER = [
    "ankara", "istanbul", "izmir", "bursa", "antalya", "adana", "konya",
    "gaziantep", "kayseri", "mersin", "eskişehir", "diyarbakır", "samsun",
    "denizli", "trabzon", "erzurum", "malatya", "van", "elazığ", "manisa",
    "kahramanmaraş", "kocaeli", "türkiye", "anadolu", "kapadokya", "avrupa", "asya"
] olsun

AY_LİSTESİ = [
    "ocak", "şubat", "mart", "nisan", "mayıs", "haziran",
    "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"
] olsun

BÜYÜK_HARFLER = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ" olsun
RAKAMLAR      = "0123456789" olsun

// ─── DUYGU SABİTLERİ ─────────────────────────────────────────────────────────

POZİTİF_KELİMELER = [
    "güzel", "harika", "mükemmel", "iyi", "seviyorum", "mutlu", "başarılı",
    "memnun", "olağanüstü", "süper", "muhteşem", "enfes", "nefis", "hoş",
    "sevimli", "güçlü", "zeki", "yetenekli", "başarı", "sevmek", "beğenmek",
    "teşekkür", "tebrik", "bravo", "aferin", "umut", "neşe", "sevinç",
    "huzur", "barış", "sevgi", "aşk", "eğlenceli", "ilginç", "faydalı",
    "yararlı", "tavsiye", "öneririm"
] olsun

NEGATİF_KELİMELER = [
    "kötü", "berbat", "korkunç", "nefret", "üzgün", "mutsuz",
    "başarısız", "hata", "yanlış", "sorun", "problem", "tehlike",
    "zararlı", "rezalet", "felaket", "facia", "dehşet", "acı",
    "zor", "imkansız", "istemiyorum", "sevmiyorum", "beğenmedim",
    "şikayet", "kaygı", "endişe", "korku", "stres", "yorgun", "bıktım"
] olsun

GÜÇLENDİRİCİLER = [
    "çok", "son", "aşırı", "oldukça", "gayet", "epey", "pek",
    "kesinlikle", "gerçekten", "tam", "fazlasıyla"
] olsun

KISALTMALAR = [
    "dr", "prof", "doç", "yrd", "arş", "öğr", "muh", "müh",
    "vb", "vs", "bkz", "örn", "no", "tel", "sok", "cad", "blv",
    "apt", "hz", "sr", "st", "mr", "mrs", "ms", "fig", "vol"
] olsun

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 1: TEMİZLEME VE TOKENİZASYON
// ════════════════════════════════════════════════════════════════════════════

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
    sonuç = değiştir(sonuç, "\u2019", " ") olsun
    sonuç = değiştir(sonuç, "\u2018", " ") olsun
    sonuç = değiştir(sonuç, "-", " ") olsun
    sonuç = değiştir(sonuç, "\n", " ") olsun
    sonuç = değiştir(sonuç, "\t", " ") olsun
    sonuç'u döndür
}

tokenize fonksiyon olsun metin alsın {
    parcalar = böl(metin, " ") olsun
    temizler = [] olsun
    i = 0 olsun
    n = uzunluk(parcalar) olsun
    i < n olduğu sürece {
        tok = kırp(parcalar[i]) olsun
        uzunluk(tok) > 0 ise {
            temizler'e [tok] ekle
        }
        i = i + 1 olsun
    }
    temizler'i döndür
}

nlp_tokenize fonksiyon olsun metin alsın {
    temiz = nlp_temizle(metin) olsun
    tokenize(temiz)'i döndür
}

karakter_tokenize fonksiyon olsun metin alsın {
    böl(metin, "")'i döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 2: DURAK KELİME FİLTRELEME
// ════════════════════════════════════════════════════════════════════════════

durak_mı fonksiyon olsun kelime alsın {
    küçük = küçük_harf(kelime) olsun
    hızlı_içeriyor(DURAK_LISTESİ, küçük)'i döndür
}

durak_kelime_filtrele fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        eleman = tokens[i] olsun
        durak  = durak_mı(eleman) olsun
        durak = 0 ise {
            sonuç'a [eleman] ekle
        }
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 3: ÜNLÜ UYUMU YARDIMCILARI
// ════════════════════════════════════════════════════════════════════════════

ünlü_mü fonksiyon olsun karakter alsın {
    içeriyor(TÜRKÇE_ÜNLÜLER, karakter)'i döndür
}

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

son_ünlü fonksiyon olsun kelime alsın {
    bulunan = "" olsun
    devam   = 1 olsun
    i = uzunluk(kelime) - 1 olsun
    i >= 0 olduğu sürece {
        devam = 1 ise {
            ünlü_mü(kelime[i]) ise {
                bulunan = kelime[i] olsun
                devam   = 0 olsun
            }
        }
        i = i - 1 olsun
    }
    bulunan'ı döndür
}

ünlü_uyumu_türü fonksiyon olsun kelime alsın {
    sü   = son_ünlü(kelime) olsun
    arka = 0 olsun
    sü = "a" ise { arka = 1 olsun }
    sü = "ı" ise { arka = 1 olsun }
    sü = "o" ise { arka = 1 olsun }
    sü = "u" ise { arka = 1 olsun }
    arka = 1 ise { "arka"'yı döndür }
    "ön"'ü döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 4: KÖKLEŞTIRME (STEMMING)
// ════════════════════════════════════════════════════════════════════════════

ek_var_mı fonksiyon olsun kelime, ek alsın {
    kel_boy = uzunluk(kelime) olsun
    ek_boy  = uzunluk(ek) olsun
    sonuç   = 0 olsun
    ek_boy < kel_boy ise {
        kalan = kel_boy - ek_boy olsun
        son   = dizi_dilim(kelime, kalan, kel_boy) olsun
        son = ek ise {
            sonuç = 1 olsun
        }
    }
    sonuç'u döndür
}

ek_çıkar fonksiyon olsun kelime, ek alsın {
    var = ek_var_mı(kelime, ek) olsun
    var = 1 ise {
        boy = uzunluk(kelime) - uzunluk(ek) olsun
        dizi_dilim(kelime, 0, boy)'u döndür
    }
    kelime'yi döndür
}

stem fonksiyon olsun kelime alsın {
    kök      = küçük_harf(kelime) olsun
    değişti  = 1 olsun

    değişti = 1 olduğu sürece {
        değişti = 0 olsun
        uzunluk(kök) > 3 ise {
            i        = 0 olsun
            ek_sayısı = uzunluk(ÇEKIM_EKLERİ) olsun
            i < ek_sayısı olduğu sürece {
                ek      = ÇEKIM_EKLERİ[i] olsun
                ek_boy  = uzunluk(ek) olsun
                kel_boy = uzunluk(kök) olsun
                fark    = kel_boy - ek_boy olsun
                fark >= 3 ise {
                    ek_var_mı(kök, ek) ise {
                        kök     = dizi_dilim(kök, 0, fark) olsun
                        değişti = 1 olsun
                        i       = ek_sayısı olsun
                    }
                }
                i = i + 1 olsun
            }
        }
    }
    kök'ü döndür
}

toplu_stem fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        sonuç'a [stem(tokens[i])] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 5: FREKANS ANALİZİ VE SIRALAMA
// ════════════════════════════════════════════════════════════════════════════

frekans_ekle fonksiyon olsun frekanslar, kelime alsın {
    bulundu = 0 olsun
    i = 0 olsun
    n = uzunluk(frekanslar) olsun
    i < n olduğu sürece {
        çift = frekanslar[i] olsun
        çift[0] = kelime ise {
            çift[1] = çift[1] + 1 olsun
            bulundu = 1 olsun
            i       = n olsun
        }
        i = i + 1 olsun
    }
    bulundu = 0 ise {
        yeni = [kelime, 1] olsun
        frekanslar'a [yeni] ekle
    }
    frekanslar'ı döndür
}

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

frekans_sırala fonksiyon olsun frekanslar alsın {
    n = uzunluk(frekanslar) olsun
    i = 0 olsun
    i < n olduğu sürece {
        j = 0 olsun
        j < (n - i - 1) olduğu sürece {
            a = frekanslar[j] olsun
            b = frekanslar[j + 1] olsun
            a[1] < b[1] ise {
                frekanslar[j]     = b olsun
                frekanslar[j + 1] = a olsun
            }
            j = j + 1 olsun
        }
        i = i + 1 olsun
    }
    frekanslar'ı döndür
}

en_sık_n fonksiyon olsun frekanslar, n alsın {
    sıralı = frekans_sırala(frekanslar) olsun
    sonuç  = [] olsun
    top    = uzunluk(sıralı) olsun
    top > n ise { top = n olsun }
    i = 0 olsun
    i < top olduğu sürece {
        sonuç'a [sıralı[i]] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 6: CÜMLE BÖLME — bayrak tabanlı, değilse yok
// ════════════════════════════════════════════════════════════════════════════

kısaltma_mı fonksiyon olsun kelime alsın {
    temiz = küçük_harf(kelime) olsun
    hızlı_içeriyor(KISALTMALAR, temiz)'i döndür
}

cümle_böl fonksiyon olsun metin alsın {
    cümleler = [] olsun
    mevcut   = "" olsun
    i = 0 olsun
    n = uzunluk(metin) olsun

    i < n olduğu sürece {
        kar = metin[i] olsun

        // Hangi tür cümle sonu? 0=normal, 1=nokta, 2=ünlem/soru
        sonu = 0 olsun
        kar = "." ise { sonu = 1 olsun }
        kar = "!" ise { sonu = 2 olsun }
        kar = "?" ise { sonu = 2 olsun }

        // Normal karakter
        sonu = 0 ise {
            mevcut = mevcut + kar olsun
        }

        // Nokta — kısaltma mı kontrol et
        sonu = 1 ise {
            parcalar = böl(kırp(mevcut), " ") olsun
            pn       = uzunluk(parcalar) olsun
            son_k    = "" olsun
            pn > 0 ise {
                son_k = parcalar[pn - 1] olsun
            }
            kıs = kısaltma_mı(son_k) olsun

            // Kısaltma → nokta ekle ama cümleyi kapatma
            kıs = 1 ise {
                mevcut = mevcut + kar olsun
            }

            // Gerçek cümle sonu
            kıs = 0 ise {
                mevcut  = mevcut + kar olsun
                temiz_c = kırp(mevcut) olsun
                uzunluk(temiz_c) > 0 ise {
                    cümleler'e [temiz_c] ekle
                }
                mevcut = "" olsun
            }
        }

        // Ünlem / Soru — direkt kapat
        sonu = 2 ise {
            mevcut  = mevcut + kar olsun
            temiz_c = kırp(mevcut) olsun
            uzunluk(temiz_c) > 0 ise {
                cümleler'e [temiz_c] ekle
            }
            mevcut = "" olsun
        }

        i = i + 1 olsun
    }

    // Sonda noktalama olmayan kalan
    kalan = kırp(mevcut) olsun
    uzunluk(kalan) > 0 ise {
        cümleler'e [kalan] ekle
    }

    cümleler'i döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 7: POS ETİKETLEME — bayrak zinciri, değilse yok
// ════════════════════════════════════════════════════════════════════════════

pos_etiket fonksiyon olsun kelime alsın {
    k      = küçük_harf(kelime) olsun
    etiket = POS_İSİM olsun
    buldu  = 0 olsun

    buldu = 0 ise {
        hızlı_içeriyor(ZAMİR_LİSTESİ, k) ise {
            etiket = POS_ZAMİR olsun
            buldu  = 1 olsun
        }
    }
    buldu = 0 ise {
        hızlı_içeriyor(BAĞLAÇ_LİSTESİ, k) ise {
            etiket = POS_BAĞLAÇ olsun
            buldu  = 1 olsun
        }
    }
    buldu = 0 ise {
        hızlı_içeriyor(EDAT_LİSTESİ, k) ise {
            etiket = POS_EDAT olsun
            buldu  = 1 olsun
        }
    }
    buldu = 0 ise {
        hızlı_içeriyor(ZARF_LİSTESİ, k) ise {
            etiket = POS_ZARF olsun
            buldu  = 1 olsun
        }
    }
    buldu = 0 ise {
        hızlı_içeriyor(SIFAT_LİSTESİ, k) ise {
            etiket = POS_SIFAT olsun
            buldu  = 1 olsun
        }
    }

    // Sıfat ek tabanlı
    buldu = 0 ise {
        sek = 0 olsun
        ek_var_mı(k, "lı")  ise { sek = 1 olsun }
        ek_var_mı(k, "li")  ise { sek = 1 olsun }
        ek_var_mı(k, "lu")  ise { sek = 1 olsun }
        ek_var_mı(k, "lü")  ise { sek = 1 olsun }
        ek_var_mı(k, "sız") ise { sek = 1 olsun }
        ek_var_mı(k, "siz") ise { sek = 1 olsun }
        ek_var_mı(k, "sal") ise { sek = 1 olsun }
        ek_var_mı(k, "sel") ise { sek = 1 olsun }
        sek = 1 ise {
            etiket = POS_SIFAT olsun
            buldu  = 1 olsun
        }
    }

    // Fiil kök listesi
    buldu = 0 ise {
        kök = stem(k) olsun
        hızlı_içeriyor(FİİL_KÖKLERİ, kök) ise {
            etiket = POS_FİİL olsun
            buldu  = 1 olsun
        }
    }

    // Fiil ek tabanlı
    buldu = 0 ise {
        fek = 0 olsun
        ek_var_mı(k, "mak")  ise { fek = 1 olsun }
        ek_var_mı(k, "mek")  ise { fek = 1 olsun }
        ek_var_mı(k, "ıyor") ise { fek = 1 olsun }
        ek_var_mı(k, "iyor") ise { fek = 1 olsun }
        ek_var_mı(k, "uyor") ise { fek = 1 olsun }
        ek_var_mı(k, "üyor") ise { fek = 1 olsun }
        ek_var_mı(k, "acak") ise { fek = 1 olsun }
        ek_var_mı(k, "ecek") ise { fek = 1 olsun }
        ek_var_mı(k, "mış")  ise { fek = 1 olsun }
        ek_var_mı(k, "miş")  ise { fek = 1 olsun }
        ek_var_mı(k, "arak") ise { fek = 1 olsun }
        ek_var_mı(k, "erek") ise { fek = 1 olsun }
        fek = 1 ise {
            etiket = POS_FİİL olsun
            buldu  = 1 olsun
        }
    }

    etiket'i döndür
}

pos_etiketle fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        kelime = tokens[i] olsun
        etiket = pos_etiket(kelime) olsun
        çift   = [kelime, etiket] olsun
        sonuç'a [çift] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

pos_yazdır fonksiyon olsun etiketli alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "🏷️  POS Etiketleme Sonuçları"'nı yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    i = 0 olsun
    n = uzunluk(etiketli) olsun
    i < n olduğu sürece {
        çift = etiketli[i] olsun
        "  " + çift[0] + "  →  [" + çift[1] + "]"'i yazdır
        i = i + 1 olsun
    }
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 8: VARLİK İSMİ TANIMA (NER) — bayrak tabanlı
// ════════════════════════════════════════════════════════════════════════════

büyük_harf_mi fonksiyon olsun karakter alsın {
    içeriyor(BÜYÜK_HARFLER, karakter)'i döndür
}

rakam_mı fonksiyon olsun karakter alsın {
    içeriyor(RAKAMLAR, karakter)'i döndür
}

sayı_token_mu fonksiyon olsun kelime alsın {
    n       = uzunluk(kelime) olsun
    tümü    = 0 olsun
    n > 0 ise {
        tümü = 1 olsun
        i    = 0 olsun
        i < n olduğu sürece {
            r = rakam_mı(kelime[i]) olsun
            r = 0 ise {
                tümü = 0 olsun
            }
            i = i + 1 olsun
        }
    }
    tümü'yü döndür
}

ner_etiket fonksiyon olsun kelime, önceki alsın {
    etiket = NER_O olsun
    buldu  = 0 olsun

    buldu = 0 ise {
        sayı_token_mu(kelime) ise {
            etiket = NER_SAYI olsun
            buldu  = 1 olsun
        }
    }
    buldu = 0 ise {
        hızlı_içeriyor(BİLİNEN_YERLER, küçük_harf(kelime)) ise {
            etiket = NER_YER olsun
            buldu  = 1 olsun
        }
    }
    buldu = 0 ise {
        hızlı_içeriyor(AY_LİSTESİ, küçük_harf(kelime)) ise {
            etiket = NER_TARİH olsun
            buldu  = 1 olsun
        }
    }
    buldu = 0 ise {
        uzunluk(kelime) > 0 ise {
            bü = büyük_harf_mi(kelime[0]) olsun
            bü = 1 ise {
                önceki_kişi = 0 olsun
                önceki = NER_KİŞİ ise { önceki_kişi = 1 olsun }
                önceki = NER_ORG  ise { önceki_kişi = 1 olsun }
                önceki_kişi = 1 ise {
                    etiket = önceki olsun
                    buldu  = 1 olsun
                }
                önceki_kişi = 0 ise {
                    etiket = NER_KİŞİ olsun
                    buldu  = 1 olsun
                }
            }
        }
    }

    etiket'i döndür
}

ner_etiketle fonksiyon olsun tokens alsın {
    sonuç  = [] olsun
    önceki = NER_O olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        kelime = tokens[i] olsun
        etiket = ner_etiket(kelime, önceki) olsun
        çift   = [kelime, etiket] olsun
        sonuç'a [çift] ekle
        önceki = etiket olsun
        i = i + 1 olsun
    }
    sonuç'u döndür
}

ner_yazdır fonksiyon olsun etiketli alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "🔍 Varlık İsmi Tanıma (NER)"'yi yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    bulunan = 0 olsun
    i = 0 olsun
    n = uzunluk(etiketli) olsun
    i < n olduğu sürece {
        çift = etiketli[i] olsun
        oo   = 0 olsun
        çift[1] = NER_O ise { oo = 1 olsun }
        oo = 0 ise {
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

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 9: DUYGU ANALİZİ — tam sayı skoru, direkt yazdır
// ════════════════════════════════════════════════════════════════════════════

duygu_puan fonksiyon olsun tokens alsın {
    puan   = 0 olsun
    çarpan = 1 olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        k     = küçük_harf(tokens[i]) olsun
        güçl  = hızlı_içeriyor(GÜÇLENDİRİCİLER, k) olsun
        güçl = 1 ise {
            çarpan = 2 olsun
        }
        güçl = 0 ise {
            poz = hızlı_içeriyor(POZİTİF_KELİMELER, k) olsun
            poz = 1 ise {
                puan   = puan + çarpan olsun
                çarpan = 1 olsun
            }
            poz = 0 ise {
                neg = hızlı_içeriyor(NEGATİF_KELİMELER, k) olsun
                neg = 1 ise {
                    puan   = puan - çarpan olsun
                    çarpan = 1 olsun
                }
                k = "değil" ise {
                    çarpan = -1 olsun
                }
            }
        }
        i = i + 1 olsun
    }
    puan'ı döndür
}

duygu_yazdır fonksiyon olsun metin alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "💬 Duygu Analizi"'ni yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    tokens = nlp_tokenize(metin) olsun
    puan   = duygu_puan(tokens) olsun
    "  Ham Puan : " + puan'ı yazdır
    poz = 0 olsun
    neg = 0 olsun
    puan > 0 ise { poz = 1 olsun }
    puan < 0 ise { neg = 1 olsun }
    poz = 1 ise { "  Etiket   : POZİTİF ✅"'i yazdır }
    neg = 1 ise { "  Etiket   : NEGATİF ❌"'i yazdır }
    poz = 0 ise {
        neg = 0 ise {
            "  Etiket   : NÖTR ➖"'ü yazdır
        }
    }
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 10: METİN BENZERLİĞİ — bölme yok, ortak kelime sayısı döndürür
// ════════════════════════════════════════════════════════════════════════════

metin_ortak_kelime fonksiyon olsun metin1, metin2 alsın {
    t1    = durak_kelime_filtrele(nlp_tokenize(metin1)) olsun
    t2    = durak_kelime_filtrele(nlp_tokenize(metin2)) olsun
    ortak = 0 olsun
    i = 0 olsun
    n = uzunluk(t1) olsun
    i < n olduğu sürece {
        hızlı_içeriyor(t2, t1[i]) ise {
            ortak = ortak + 1 olsun
        }
        i = i + 1 olsun
    }
    ortak'ı döndür
}

metin_benzerlik_yazdır fonksiyon olsun isim, metin1, metin2 alsın {
    ortak = metin_ortak_kelime(metin1, metin2) olsun
    "  " + isim + "  →  ortak kelime sayısı: " + ortak'ı yazdır
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 11: BELGE SKORLAMA (TF tabanlı, bölme yok)
// ════════════════════════════════════════════════════════════════════════════

tf_say fonksiyon olsun tokens, kelime alsın {
    sayac = 0 olsun
    i = 0 olsun
    n = uzunluk(tokens) olsun
    i < n olduğu sürece {
        tokens[i] = kelime ise {
            sayac = sayac + 1 olsun
        }
        i = i + 1 olsun
    }
    sayac'ı döndür
}

df_say fonksiyon olsun belge_listesi, kelime alsın {
    df = 0 olsun
    i  = 0 olsun
    n  = uzunluk(belge_listesi) olsun
    i < n olduğu sürece {
        tokens = belge_listesi[i] olsun
        j      = 0 olsun
        m      = uzunluk(tokens) olsun
        var    = 0 olsun
        j < m olduğu sürece {
            tokens[j] = kelime ise {
                var = 1 olsun
                j   = m olsun
            }
            j = j + 1 olsun
        }
        var = 1 ise { df = df + 1 olsun }
        i = i + 1 olsun
    }
    df'i döndür
}

belge_skorla fonksiyon olsun belge_metni, tüm_token_listesi alsın {
    tokens  = durak_kelime_filtrele(nlp_tokenize(belge_metni)) olsun
    frekans = kelime_frekansları(tokens) olsun
    belge_n = uzunluk(tüm_token_listesi) olsun
    sonuç   = [] olsun
    i = 0 olsun
    n = uzunluk(frekans) olsun
    i < n olduğu sürece {
        çift    = frekans[i] olsun
        kelime  = çift[0] olsun
        tf      = çift[1] olsun
        df      = df_say(tüm_token_listesi, kelime) olsun
        ters_df = belge_n - df + 1 olsun
        skor    = tf + ters_df olsun
        sonuç'a [[kelime, skor]] ekle
        i = i + 1 olsun
    }
    frekans_sırala(sonuç)'u döndür
}

tfidf_koleksiyon fonksiyon olsun belgeler alsın {
    tüm_tokens = [] olsun
    i = 0 olsun
    n = uzunluk(belgeler) olsun
    i < n olduğu sürece {
        bt = durak_kelime_filtrele(nlp_tokenize(belgeler[i])) olsun
        tüm_tokens'a [bt] ekle
        i = i + 1 olsun
    }
    sonuç = [] olsun
    i = 0 olsun
    i < n olduğu sürece {
        s = belge_skorla(belgeler[i], tüm_tokens) olsun
        sonuç'a [s] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 12: METİN İSTATİSTİĞİ
// ════════════════════════════════════════════════════════════════════════════

metin_istatistik fonksiyon olsun metin alsın {
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "📊 Metin İstatistiği"'ni yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
    "Karakter sayısı : " + uzunluk(metin)'i yazdır
    tokens = nlp_tokenize(metin) olsun
    nt     = uzunluk(tokens) olsun
    "Kelime sayısı   : " + nt'yi yazdır
    cümleler = cümle_böl(metin) olsun
    "Tahmini cümle   : " + uzunluk(cümleler)'i yazdır
    benzersiz = durak_kelime_filtrele(tokens) olsun
    "Durak dışı tok. : " + uzunluk(benzersiz)'i yazdır
    toplam = 0 olsun
    i = 0 olsun
    i < nt olduğu sürece {
        toplam = toplam + uzunluk(tokens[i]) olsun
        i = i + 1 olsun
    }
    "Toplam kar. boy : " + toplam'ı yazdır
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 13: N-GRAM
// ════════════════════════════════════════════════════════════════════════════

bigram fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    n = uzunluk(tokens) olsun
    i = 0 olsun
    i < (n - 1) olduğu sürece {
        gram = tokens[i] + " " + tokens[i + 1] olsun
        sonuç'a [gram] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

trigram fonksiyon olsun tokens alsın {
    sonuç = [] olsun
    n = uzunluk(tokens) olsun
    i = 0 olsun
    i < (n - 2) olduğu sürece {
        gram = tokens[i] + " " + tokens[i + 1] + " " + tokens[i + 2] olsun
        sonuç'a [gram] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

ngram fonksiyon olsun tokens, n alsın {
    sonuç = [] olsun
    boy   = uzunluk(tokens) olsun
    i = 0 olsun
    i < (boy - n + 1) olduğu sürece {
        gram = "" olsun
        j    = 0 olsun
        j < n olduğu sürece {
            j > 0 ise {
                gram = gram + " " olsun
            }
            gram = gram + tokens[i + j] olsun
            j = j + 1 olsun
        }
        sonuç'a [gram] ekle
        i = i + 1 olsun
    }
    sonuç'u döndür
}

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 14: KARAKTER NORMALİZASYONU
// ════════════════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════════════════
// MODÜL 15: TAM NLP PIPELINE
// ════════════════════════════════════════════════════════════════════════════

nlp_pipeline fonksiyon olsun metin alsın {
    "🚀 NLP Pipeline Başlıyor..."'u yazdır
    cümleler = cümle_böl(metin) olsun
    "✅ [1/5] Cümle bölme    : " + uzunluk(cümleler) + " cümle"'yi yazdır
    tokens = nlp_tokenize(metin) olsun
    "✅ [2/5] Tokenizasyon   : " + uzunluk(tokens) + " token"'i yazdır
    temiz  = durak_kelime_filtrele(tokens) olsun
    kökler = toplu_stem(temiz) olsun
    "✅ [3/5] Stemming       : " + uzunluk(kökler) + " kök"'ü yazdır
    frekanslar = frekans_sırala(kelime_frekansları(kökler)) olsun
    "✅ [4/5] Frekans        : " + uzunluk(frekanslar) + " benzersiz kök"'ü yazdır
    duygu_yazdır(metin)
    "✅ [5/5] Duygu analizi tamamlandı"'yı yazdır
    frekanslar'ı döndür
}

// ─── YÜKLEME ONAYI ───────────────────────────────────────────────────────────
"[nlp.hb v3.0.0] Türkçe NLP kütüphanesi yüklendi ✓"'ü yazdır
