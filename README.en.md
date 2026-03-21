# Hüma Programming Language

Hüma is a high-performance, safe, and intuitive programming language that combines modern software principles with a natural Turkish syntax. Developed in Rust, it features a hybrid architecture supporting both tree-walking interpretation and a bytecode-based Virtual Machine (VM).

[**Türkçe README için tıklayın.**](README.md)

---

## 🚀 Key Features

- **Natural Language Syntax:** Write code as you think in your native language (using terms like `olsun` for definition, `ise / yoksa` for conditionals, and `olduğu sürece` for loops).
- **Flexible Suffix System:** Turkish grammatical suffixes like `x'i yazdır` or `liste'ye ekle` are automatically handled for a most natural writing experience.
- **Hybrid Execution:** Choose between direct interpretation for development and bytecode execution for higher performance.
- **Standalone Compilation:** Compile your code into native binary executables with zero external dependencies.
- **Rich Standard Library:** Built-in support for mathematics, terminal coloring, time management, advanced list manipulation, and unit testing.
- **Modern IDE Support:** Full-featured IDEs available in both Native (GTK) and Web/Tauri flavors.

---

## 🛠️ Installation & Build

You need [Rust](https://www.rust-lang.org/) installed on your system.

```bash
git clone https://github.com/VastSea0/humapy.git
cd humapy
cargo build --release
```

The compiled binary will be located at `target/release/huma`.

---

## 💻 Usage Guide

### 1. Interactive Mode (REPL)

Try code directly in the terminal:

```bash
cargo run
```

### 2. Run a Script (Interpreter)

Run a `.hb` file using the tree-walking interpreter:

```bash
# General usage
cargo run -- script.hb
# Example
cargo run -- examples/fibonacci.hb
```

### 3. Bytecode Mode (Performance)

Compile to bytecode and execute via the VM:

```bash
# Compile to bytecode (.hbc)
cargo run -- --derle script.hb output.hbc
# Execute bytecode
cargo run -- --yürüt output.hbc
```

---

## 📖 Language Reference

### Basic Syntax

```huma
// Variable Definition and Assignment
x = 10 olsun
name = "Hüma" olsun

// Arithmetic
total = x + 5 * 2 olsun

// Conditionals (ise / yoksa)
x > 5 ise {
    "Greater than 5"'ı yazdır;
} yoksa {
    "Less than or equal to 5"'ı yazdır;
}

// Loops (olduğu sürece)
i = 0 olsun
i < 5 olduğu sürece {
    "Index: " + i'yi yazdır;
    i = i + 1 olsun
}
```

### Functions & Classes

```huma
yükle "matematik.hb";

greet fonksiyon olsun user alsın {
    "Hello, " + user + "!"'ı döndür
}

msg = greet("World") olsun
msg'yı yazdır;

calculator sınıf olsun {
    add fonksiyon olsun a, b alsın {
        a + b'yi döndür
    }
}
calc = calculator() olsun
calc.add(10, 20)'yi yazdır;
```

### Lists

```huma
fruits = ["Apple", "Pear"] olsun
fruits'e ["Banana"]'yı ekle;
fruits'ten [0]'ı çıkar; // delete by index

i = 0 olsun
i < fruits'ın uzunluğu olduğu sürece {
    fruits[i]'yi yazdır;
    i = i + 1 olsun
}
```

---

## 📚 Standard Libraries (`lib/`)

- **`matematik.hb`**: `karesi(n)`, `kuvvet(a, b)`, `faktöriyel(n)`.
- **`renkler.hb`**: `başarı_yaz(m)`, `hata_yaz(m)`, terminal colors.
- **`dizgi.hb`**: String tools like `kırp` (trim), `içeriyor_mu` (contains).
- **`liste.hb`**: `eşle(d, f)`, `filtrele(d, f)`, `indirge(d, f, b)`.
- **`birim_test.hb`**: Native unit testing framework.

---

## 📜 License

This project is licensed under the MIT License.
