yükle "matematik.hb";

fonksiyon fibonacci(n) {
    eğer n <= 1 { döndür n; }
    döndür fibonacci(n - 1) + fibonacci(n - 2);
}

yazdır("--- Fibonacci Serisi ---");
değişken i = 0;
döngü i < 10 {
    yazdır("fib(" + i + ") = " + fibonacci(i));
    i = i + 1;
}
