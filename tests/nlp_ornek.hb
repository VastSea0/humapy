yükle "lib/nlp.hb"

"\n=== HÜMA NLP TESTİ ==="’yi yazdır
metin = "Ahmet, bugün okula koşarak gitti ama derslerini hiç çalışmadı ve oyun oynadı." olsun

"--------------------------------"’yı yazdır
"Orijinal Metin: "'i yazdır
metin'i yazdır

"--------------------------------"’yı yazdır
"1. Temizleme ve Ayrıştırma (Tokenize): "'i yazdır
temiz_metin = nlp_temizle(metin)
kelimeler = tokenize(temiz_metin)
kelimeler'i yazdır

"--------------------------------"’yı yazdır
"2. Durak Kelimeleri Çıkarma (Stopwords): "'i yazdır
kalan_kelimeler = durak_kelime_filtrele(kelimeler)
kalan_kelimeler'i yazdır

"--------------------------------"’yı yazdır
"3. Kök Bulma (Stemming): "'i yazdır
kokler = toplu_stem(kalan_kelimeler)
kokler'i yazdır

"--------------------------------"’yı yazdır
"4. Frekans Analizi: "'i yazdır
frekanslar = kelime_frekansları(kokler)
frekanslar'ı yazdır

"--------------------------------"’yı yazdır
"5. Sıralı Frekans Analizi: "'i yazdır
sıralı_frekanslar = frekans_sırala(frekanslar)
sıralı_frekanslar'ı yazdır

"--------------------------------"’yı yazdır
"Bütüncül NLP Pipeline Çıktısı: "'i yazdır
sonuc = nlp_pipeline(metin)
sonuc'u yazdır

"--------------------------------"’yı yazdır
"Yeni Cümle Bölücü Özelliği (Kısaltma Destekli): "'i yazdır
cümle_metni = "Prof. Dr. Ahmet Bey, bugün okula geldi! Hemen ders çalıştı vizelerine girdi. Sonuç çok iyiydi." olsun
cümleler = cümle_böl(cümle_metni)
cümleler'i yazdır

"NLP Testi Başarıyla Tamamlandı!"'yı yazdır
