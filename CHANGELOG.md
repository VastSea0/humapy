# Değişim Günlüğü (Changelog)

Tüm önemli değişiklikler bu dosyada takip edilecektir.

## [0.1.0] - 2026-03-16

### Eklendi

- **Yeni Rust Temelli Mimari**: Dil tamamen Rust ile yeniden yazıldı.
- **Bytecode Sanal Makine (VM)**: Yüksek performanslı bytecode yürütme motoru.
- **Ağaç-Gezinme Yorumlayıcısı**: Hızlı denemeler için alternatif yorumlayıcı.
- **İkili Dosya Oluşturma (Standalone Binary)**: Hüma kodlarını bağımsız çalıştırılabilir dosyalara derleyebilme özelliği.
- **Gelişmiş Standart Kütüphane**:
  - `matematik.hb`: Gelişmiş matematiksel fonksiyonlar.
  - `dizgi.hb`: Metin işleme araçları.
  - `liste.hb`: Map, Filter, Reduce fonksiyonları.
  - `birim_test.hb`: Yerleşik test framework'ü.
  - `renkler.hb`, `zaman.hb`, `rastgele.hb`, `dosya.hb`, `istatistik.hb`.
- **REPL**: Etkileşimli kod deneme ortamı.
- **Modül Sistemi**: `yükle` komutu ile kütüphane desteği.
- **Yeni Operatörler**: Mod (%) operatörü desteği.
- **Tip Zorlama (Coercion)**: Metin ve sayı arasında otomatik dönüşüm desteği.

---

# Changelog (English)

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-03-16

### Added

- **New Rust-Based Architecture**: Complete rewrite from Python to Rust.
- **Bytecode Virtual Machine (VM)**: High-performance bytecode execution engine.
- **Tree-Walking Interpreter**: Alternative interpreter for rapid prototyping.
- **Standalone Binary Compilation**: Ability to compile Hüma scripts into native executables.
- **Advanced Standard Library**:
  - `matematik.hb`: Math functions.
  - `dizgi.hb`: String manipulation.
  - `liste.hb`: Functional programming tools (Map, Filter, Reduce).
  - `birim_test.hb`: Unit testing framework.
  - `renkler.hb`, `zaman.hb`, `rastgele.hb`, `dosya.hb`, `istatistik.hb`.
- **REPL**: Interactive shell.
- **Module System**: Library support via `yükle` (load) command.
- **New Operators**: Support for Mod (%) operator.
- **Type Coercion**: Implicit conversion between strings and numbers.
