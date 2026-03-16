yükle "rastgele.hb";
yükle "renkler.hb";

fonksiyon baslat() {
    renkli_yaz("===== SAYI TAHMİN OYUNU =====", SARI + KALIN);
    yazdır("1 ile 100 arasında bir sayı tuttum.");
    
    değişken hedef = r_tamsayı(1, 100);
    değişken deneme = 0;
    değişken tahmin = 0;
    
    döngü tahmin != hedef {
        deneme = deneme + 1;
        tahmin = oku(deneme + ". Tahmininiz: ");
        
        eğer tipi(tahmin) != "Sayı" {
             // 'oku' metin döner, Hüma'da sayı karşılaştırması metni sayıya çevirmeyi denemeli
             // Eğer çeviremezse hata olabilir. Şimdilik düz kontrol.
        }
        
        eğer tahmin < hedef {
            renkli_yaz("Daha BÜYÜK bir sayı girin.", MAVI);
        } değilse eğer tahmin > hedef {
            renkli_yaz("Daha KÜÇÜK bir sayı girin.", TURKUAZ);
        }
    }
    
    başarı_yaz("TEBRİKLER! " + deneme + " denemede buldunuz.");
}

baslat();
