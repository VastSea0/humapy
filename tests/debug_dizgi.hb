değişken s = " ";
yazdır("Boşluk uzunluğu: " + uzunluk(s));
yazdır("Boşluk mu: " + (s == " "));
yazdır("Karakter kodu testi: " + (s == "\n"));

değişken m = " \n\t";
değişken i = 0;
döngü i < uzunluk(m) {
    yazdır("Index " + i + ": '" + m[i] + "'");
    i = i + 1;
}
