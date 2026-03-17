# Hüma Programming Language

Hüma is a high-performance, safe, and intuitive programming language that combines modern software principles with Turkish natural language syntax. Developed in Rust, it features a hybrid architecture supporting both tree-walking interpretation and a bytecode-based Virtual Machine (VM).

[**Türkçe README için tıklayın.**](README.md)

---

## 🚀 Key Features

- **Natural Turkish Syntax:** Write code as you think in your native language.
- **Hybrid Execution:** Choose between direct interpretation for development and bytecode execution for performance.
- **Standalone Compilation:** Compile your code into native binary executables with zero external dependencies.
- **Rich Standard Library:** Built-in support for mathematics, terminal coloring, time management, file I/O, and advanced list manipulation.
- **Flexible Syntax:** Choose between accented (yazdır, eğer) or plain ASCII (yazdir, eger) keywords for convenience.
- **Modern IDE Support:** Full-featured IDEs available in both Native (GTK) and Web/Tauri flavors.
- **Safety First:** Leverages Rust's memory safety guarantees.

---

## 🏗️ Technical Architecture

Hüma has evolved from a simple tree-walking interpreter into a sophisticated multi-stage pipeline:

1. **Lexical Analysis (Lexer):** Tokenizes Turkish keywords and UTF-8 characters.
2. **Syntactic Analysis (Parser):** Generates an Abstract Syntax Tree (AST).
3. **Bytecode Compilation:** The `Derleyici` (Compiler) transforms the AST into a custom, stack-based instruction set (`OpCode`).
4. **Virtual Machine (VM):** A high-performance execution engine that processes bytecode instructions with a managed stack and global memory.
5. **Native Code Generation:** The `--inşa-et` (build) flag generates standalone Rust source code that embeds the bytecode and a minimal VM runtime, which is then compiled into a single native binary by `rustc`.

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

### 4. Standalone Executable (Native Binary)

Generate a native executable from your Hüma script:

```bash
cargo run -- --inşa-et script.hb my_app
rustc my_app.rs
./my_app
```

---

## 🎨 Hüma IDE

Two professional desktop editor options are available for Hüma development:

### 1. Native IDE

A high-performance, GTK-based native Linux editor with a minimal footprint.

```bash
cargo run --bin ide_native
```

### 2. Modern Web IDE (Tauri)

A feature-rich desktop experience powered by Tauri (syntax highlighting, file management, etc.).

```bash
# As a web server
cd ide && npm start

# Or as a Tauri desktop app
npx tauri dev
```

---

## 📖 Language Reference

### Basic Syntax

```huma
// Variable Definition
değişken x = 10;
değişken name = "Hüma";

// Math
değişken total = x + 5 * 2;

// Conditionals
eğer x > 5 {
    yazdır("Greater than 5");
} değilse {
    yazdır("Less than or equal to 5");
}

// Loops
değişken i = 0;
döngü i < 5 {
    yazdır("Index: " + i);
    i = i + 1;
}
```

### Functions & Modules

```huma
yükle "matematik.hb";

fonksiyon greet(user) {
    yazdır("Hello, " + user + "!");
}

greet("World");
yazdır("PI: " + PI);
```

### Slicing & Functional Tools

```huma
değişken numbers = [1, 2, 3, 4, 5];
fonksiyon double(n) { döndür n * 2; }
değişken results = eşle(numbers, double);
yazdır(results); // [2, 4, 6, 8, 10]
```

---

## 📚 Standard Libraries (`lib/`)

- **`matematik.hb`**: `PI`, `E`, `karesi(n)`, `kuvvet(a, b)`, `faktöriyel(n)`.
- **`renkler.hb`**: `başarı_yaz(msg)`, `hata_yaz(msg)`, terminal colors.
- **`dizgi.hb`**: String tools like `kırp` (trim), `içeriyor_mu` (contains).
- **`liste.hb`**: `eşle` (map), `filtrele` (filter), `indirge` (reduce).
- **`birim_test.hb`**: Native unit testing framework.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

---

## 📜 License

This project is licensed under the MIT License.
