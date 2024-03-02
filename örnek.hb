

bas("ilk sayıyı girin")
al sayi1 = giris_sayi()
bas("ikinci sayıyı girin")
al sayi2 = giris_sayi()
bas("")


bas("ne yapmak istediğini seç:")
bas("")


bas("1. toplama (giriş '1')")
bas("2. çıkarma (giriş '2')")
bas("3. bölme (giriş '3')")
bas("4. çarpma(giriş '4')")



al islem = giris()
bas("")

bas("bekleyin hesaplıyoruz.")


al cevap = (eger islem == "1" sonra  (sayi1 + sayi2) egerdegilse islem == "2" sonra (sayi1 - sayi2) egerdegilse islem == "3" sonra (sayi1 / sayi2) egerdegilse islem == "4" sonra (sayi1 * sayi2) degilse"geçersiz bir değer girdin birdaha dene")



bas("")
bas("CEVAP:")
bas(cevap)