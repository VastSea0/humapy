yükle "lib/nlp.hb"

// ════════════════════════════════════════════════════════════════════════════
// haber_analiz.hb — Türkçe Haber Analiz Sistemi
// Hüma NLP v3.0.0 kullanılarak yazılmıştır.
//
// Bu program 5 gerçek haber başlığını ve gövdesini alır:
//   1. Her haberin duygusunu tespit eder
//   2. Haberdeki varlıkları (kişi, yer, tarih) çıkarır
//   3. Anahtar kelimeleri bulur (TF tabanlı skorlama)
//   4. Haberler arası benzerlik hesaplar
//   5. Tüm koleksiyonun kelime istatistiğini özetler
// ════════════════════════════════════════════════════════════════════════════

// ─── HABER VERİSİ ────────────────────────────────────────────────────────────

h1_başlık = "Türkiye ekonomisi güçlü büyüme kaydetti" olsun
h1_metin  = "Türkiye ekonomisi bu yıl yüzde sekiz büyüme kaydetti. Ankara'da açıklanan rakamlara göre ihracat rekor seviyeye ulaştı. Ekonomi Bakanı Mehmet Şimşek başarılı sonuçları değerlendirdi ve yatırımcılara güven verdi." olsun

h2_başlık = "İstanbul'da büyük deprem tatbikatı yapıldı" olsun
h2_metin  = "İstanbul Büyükşehir Belediyesi kapsamlı bir deprem tatbikatı düzenledi. Kadıköy ve Üsküdar ilçelerinde binlerce vatandaş tatbikata katıldı. AFAD ekipleri başarılı bir operasyon gerçekleştirdi ve hazırlıklar tamamlandı." olsun

h3_başlık = "Yapay zeka eğitimde yeni dönem açıyor" olsun
h3_metin  = "Milli Eğitim Bakanlığı yapay zeka destekli eğitim sistemini tanıttı. Ankara ve İzmir'deki pilot okullarda öğrenciler yeni teknolojiyle tanıştı. Uzmanlar bu gelişmenin eğitim kalitesini artıracağını söyledi." olsun

h4_başlık = "Orman yangınlarında endişe verici artış" olsun
h4_metin  = "Bu yaz Türkiye'nin Akdeniz bölgesinde çıkan orman yangınları büyük endişe yarattı. Muğla ve Antalya'da binlerce hektar alan yandı. Yangınlar sorun olmaya devam ediyor ve risk hâlâ geçmedi." olsun

h5_başlık = "Türk takımları Avrupa'da başarılı sonuçlar aldı" olsun
h5_metin  = "Galatasaray ve Fenerbahçe Avrupa kupalarında harika performans sergiledi. İstanbul takımları bu sezon muhteşem bir çıkış yakaladı. Taraftarlar büyük sevinç yaşadı ve başarı kutlandı." olsun

// Tüm haber metinleri listesi
haberler      = [h1_metin, h2_metin, h3_metin, h4_metin, h5_metin] olsun
haber_başlıkları = [h1_başlık, h2_başlık, h3_başlık, h4_başlık, h5_başlık] olsun

// ════════════════════════════════════════════════════════════════════════════
// BÖLÜM 1: BAŞLIK
// ════════════════════════════════════════════════════════════════════════════

"╔══════════════════════════════════════════════════════════╗"'i yazdır
"║     📰  TÜRKÇE HABER ANALİZ SİSTEMİ                     ║"'i yazdır
"║     Hüma NLP v3.0.0 — 5 Haber · 5 Analiz Katmanı        ║"'i yazdır
"╚══════════════════════════════════════════════════════════╝"'i yazdır

// ════════════════════════════════════════════════════════════════════════════
// BÖLÜM 2: TEK TEK HABER ANALİZİ
// ════════════════════════════════════════════════════════════════════════════

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📋 BÖLÜM 2 — Haber Haber Analiz"'i yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

i = 0 olsun
i < 5 olduğu sürece {
    "┌─────────────────────────────────────────────────────────┐"'i yazdır
    "│ Haber " + (i + 1) + ": " + haber_başlıkları[i]'nı yazdır
    "└─────────────────────────────────────────────────────────┘"'i yazdır

    metin = haberler[i] olsun

    // Cümle sayısı
    cümleler = cümle_böl(metin) olsun
    "  📝 Cümle sayısı  : " + uzunluk(cümleler)'i yazdır

    // Kelime sayısı
    tokenler = nlp_tokenize(metin) olsun
    "  🔤 Kelime sayısı : " + uzunluk(tokenler)'i yazdır

    // Duygu analizi
    duygu_yazdır(metin)

    // NER — varlıklar
    "  🔍 Varlıklar:"'i yazdır
    ham_tokenler = tokenize(metin) olsun
    ner_sonuç    = ner_etiketle(ham_tokenler) olsun
    bulunan      = 0 olsun
    j = 0 olsun
    j < uzunluk(ner_sonuç) olduğu sürece {
        çift = ner_sonuç[j] olsun
        oo   = 0 olsun
        çift[1] = NER_O ise { oo = 1 olsun }
        oo = 0 ise {
            "    [" + çift[1] + "] " + çift[0]'ı yazdır
            bulunan = bulunan + 1 olsun
        }
        j = j + 1 olsun
    }
    bulunan = 0 ise {
        "    (varlık bulunamadı)"'yı yazdır
    }

    // Anahtar kelimeler (en sık 3 kök) - akıllı_stem ile
    kökler = [] olsun
    z = 0 olsun
    z_len = uzunluk(ner_sonuç) olsun
    z < z_len olduğu sürece {
        çift = ner_sonuç[z] olsun
        kelime = çift[0] olsun
        etiket = çift[1] olsun
        
        // nlp_temizle ile noktalama ve büyük/küçük harf düzelt
        temizlenmiş = nlp_temizle(kelime) olsun
        
        // boş değilse ve durak değilse
        kırpılmış = kırp(temizlenmiş) olsun
        uzunluk(kırpılmış) > 0 ise {
            parçalar = tokenize(kırpılmış) olsun
            pz = 0 olsun
            pz_len = uzunluk(parçalar) olsun
            pz < pz_len olduğu sürece {
                alt_kel = parçalar[pz] olsun
                dur = durak_mı(alt_kel) olsun
                dur = 0 ise {
                    akıllı = akıllı_stem(alt_kel, etiket) olsun
                    kökler'e [akıllı] ekle
                }
                pz = pz + 1 olsun
            }
        }
        z = z + 1 olsun
    }
    frekans = kelime_frekansları(kökler) olsun
    en3    = en_sık_n(frekans, 3) olsun
    "  🔑 Anahtar kökler:"'i yazdır
    k = 0 olsun
    k < uzunluk(en3) olduğu sürece {
        çift = en3[k] olsun
        "    " + çift[0] + " (" + çift[1] + "x)"'i yazdır
        k = k + 1 olsun
    }

    ""'i yazdır
    i = i + 1 olsun
}

// ════════════════════════════════════════════════════════════════════════════
// BÖLÜM 3: HABERLER ARASI BENZERLİK MATRİSİ
// ════════════════════════════════════════════════════════════════════════════

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📋 BÖLÜM 3 — Haberler Arası Benzerlik (ortak kelime)"'i yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

"  H1 = " + h1_başlık'ı yazdır
"  H2 = " + h2_başlık'ı yazdır
"  H3 = " + h3_başlık'ı yazdır
"  H4 = " + h4_başlık'ı yazdır
"  H5 = " + h5_başlık'ı yazdır
""'i yazdır

// 5x5 benzerlik — sadece üst üçgen (tekrar önlemek için)
a = 0 olsun
a < 5 olduğu sürece {
    b = a + 1 olsun
    b < 5 olduğu sürece {
        ortak = metin_ortak_kelime(haberler[a], haberler[b]) olsun
        "  H" + (a + 1) + " ↔ H" + (b + 1) + "  ortak: " + ortak'ı yazdır
        b = b + 1 olsun
    }
    a = a + 1 olsun
}

// ════════════════════════════════════════════════════════════════════════════
// BÖLÜM 4: TF TABANLI ANAHTAR KELİME SKORLAMASI (tüm koleksiyon)
// ════════════════════════════════════════════════════════════════════════════

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📋 BÖLÜM 4 — Koleksiyon Geneli TF Skorlaması"'yı yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

tfidf = tfidf_koleksiyon(haberler) olsun

"  ▸ Haber 1 en önemli kelimeler:"'i yazdır
h1_skor = tfidf[0] olsun
s = 0 olsun
s < 3 olduğu sürece {
    s < uzunluk(h1_skor) ise {
        çift = h1_skor[s] olsun
        "    " + çift[0] + " → skor: " + çift[1]'i yazdır
    }
    s = s + 1 olsun
}

"  ▸ Haber 2 en önemli kelimeler:"'i yazdır
h2_skor = tfidf[1] olsun
s = 0 olsun
s < 3 olduğu sürece {
    s < uzunluk(h2_skor) ise {
        çift = h2_skor[s] olsun
        "    " + çift[0] + " → skor: " + çift[1]'i yazdır
    }
    s = s + 1 olsun
}

"  ▸ Haber 3 en önemli kelimeler:"'i yazdır
h3_skor = tfidf[2] olsun
s = 0 olsun
s < 3 olduğu sürece {
    s < uzunluk(h3_skor) ise {
        çift = h3_skor[s] olsun
        "    " + çift[0] + " → skor: " + çift[1]'i yazdır
    }
    s = s + 1 olsun
}

"  ▸ Haber 4 en önemli kelimeler:"'i yazdır
h4_skor = tfidf[3] olsun
s = 0 olsun
s < 3 olduğu sürece {
    s < uzunluk(h4_skor) ise {
        çift = h4_skor[s] olsun
        "    " + çift[0] + " → skor: " + çift[1]'i yazdır
    }
    s = s + 1 olsun
}

"  ▸ Haber 5 en önemli kelimeler:"'i yazdır
h5_skor = tfidf[4] olsun
s = 0 olsun
s < 3 olduğu sürece {
    s < uzunluk(h5_skor) ise {
        çift = h5_skor[s] olsun
        "    " + çift[0] + " → skor: " + çift[1]'i yazdır
    }
    s = s + 1 olsun
}

// ════════════════════════════════════════════════════════════════════════════
// BÖLÜM 5: DUYGU DAĞILIMI ÖZETİ
// ════════════════════════════════════════════════════════════════════════════

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📋 BÖLÜM 5 — Duygu Dağılımı Özeti"'ni yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

poz_sayı = 0 olsun
neg_sayı = 0 olsun
nötr_sayı = 0 olsun

i = 0 olsun
i < 5 olduğu sürece {
    metin  = haberler[i] olsun
    tokens = nlp_tokenize(metin) olsun
    puan   = duygu_puan(tokens) olsun

    poz = 0 olsun
    neg = 0 olsun
    puan > 0 ise { poz = 1 olsun }
    puan < 0 ise { neg = 1 olsun }

    poz = 1 ise {
        poz_sayı = poz_sayı + 1 olsun
        "  ✅ H" + (i + 1) + " POZİTİF  (" + puan + ")  — " + haber_başlıkları[i]'nı yazdır
    }
    neg = 1 ise {
        neg_sayı = neg_sayı + 1 olsun
        "  ❌ H" + (i + 1) + " NEGATİF  (" + puan + ")  — " + haber_başlıkları[i]'nı yazdır
    }
    poz = 0 ise {
        neg = 0 ise {
            nötr_sayı = nötr_sayı + 1 olsun
            "  ➖ H" + (i + 1) + " NÖTR     (" + puan + ")  — " + haber_başlıkları[i]'nı yazdır
        }
    }
    i = i + 1 olsun
}

""'i yazdır
"  Toplam POZİTİF : " + poz_sayı'yı yazdır
"  Toplam NEGATİF : " + neg_sayı'yı yazdır
"  Toplam NÖTR    : " + nötr_sayı'yı yazdır

// ════════════════════════════════════════════════════════════════════════════
// BÖLÜM 6: KOLEKSIYON GENELİ İSTATİSTİK
// ════════════════════════════════════════════════════════════════════════════

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📋 BÖLÜM 6 — Koleksiyon Geneli İstatistik"'i yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

// Tüm metinleri birleştir
tüm_metin = h1_metin + " " + h2_metin + " " + h3_metin + " " + h4_metin + " " + h5_metin olsun

toplam_kar    = uzunluk(tüm_metin) olsun
tüm_tokenler  = nlp_tokenize(tüm_metin) olsun
toplam_kelime = uzunluk(tüm_tokenler) olsun

tüm_cümleler  = cümle_böl(tüm_metin) olsun
toplam_cümle  = uzunluk(tüm_cümleler) olsun

temiz_tümü    = durak_kelime_filtrele(tüm_tokenler) olsun
tüm_kökler    = toplu_stem(temiz_tümü) olsun
tüm_frekans   = kelime_frekansları(tüm_kökler) olsun
benzersiz_kök = uzunluk(tüm_frekans) olsun

"  📊 5 haberin istatistiği:"'i yazdır
"  Toplam karakter   : " + toplam_kar'ı yazdır
"  Toplam kelime     : " + toplam_kelime'yi yazdır
"  Toplam cümle      : " + toplam_cümle'yi yazdır
"  Benzersiz kök     : " + benzersiz_kök'ü yazdır

""'i yazdır
"  🏆 Koleksiyonun en sık 5 kökü:"'i yazdır
en5 = en_sık_n(tüm_frekans, 5) olsun
r = 0 olsun
r < uzunluk(en5) olduğu sürece {
    çift = en5[r] olsun
    "    " + (r + 1) + ". " + çift[0] + "  —  " + çift[1] + " kez"'i yazdır
    r = r + 1 olsun
}

// ════════════════════════════════════════════════════════════════════════════
// SON
// ════════════════════════════════════════════════════════════════════════════

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"╔══════════════════════════════════════════════════════════╗"'i yazdır
"║  ✅  Haber analizi tamamlandı.                           ║"'i yazdır
"║  Hüma NLP — Türkçe doğal dil işleme başarıyla çalıştı.  ║"'i yazdır
"╚══════════════════════════════════════════════════════════╝"'i yazdır
