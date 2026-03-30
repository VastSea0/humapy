import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Functions & Classes",
  description:
    "Define reusable logic with Hüma functions and model data with classes.",
};

const functionCode = `// Fonksiyon Tanımlama
topla fonksiyon olsun a, b alsın {
    a + b'yi döndür
}

// Fonksiyon çağırma
sonuç = topla(5, 10)
sonuç'u yazdır;`;

const classCode = `// Sınıf Tanımlama
araç sınıf olsun {
    hız = 0 olsun

    hızlan fonksiyon olsun miktar alsın {
        kendisi'nin hız = kendisi'nin hız + miktar olsun
    }

    hız_göster fonksiyon olsun {
        "Mevcut hız: " + kendisi'nin hız'ı yazdır;
    }
}

// Nesne oluşturma
araba = araç() olsun
araba.hızlan(10)
araba.hız_göster()`;

const combinedCode = `// Fonksiyonlar ve Sınıflar Birlikte
çember sınıf olsun {
    yarıçap = 0 olsun

    alan_hesapla fonksiyon olsun {
        // PI * r^2
        3.14159 * kendisi'nin yarıçap * kendisi'nin yarıçap'ı döndür
    }
}

küçük_çember = çember() olsun
küçük_çember.yarıçap = 5 olsun

alan = küçük_çember.alan_hesapla()
"Alan: " + alan'ı yazdır;`;

export default function FunctionsClassesPage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">The Language</span>
          <span>/</span>
          <span className="text-primary">Functions & Classes</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Functions & Classes
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          Hüma treats functions and classes as first-class language constructs.
          Functions use{" "}
          <code className="text-tertiary font-mono">fonksiyon olsun</code> and
          classes use{" "}
          <code className="text-tertiary font-mono">sınıf olsun</code>. Inside
          a class, <code className="text-tertiary font-mono">kendisi</code>{" "}
          (meaning &ldquo;self&rdquo;) refers to the current instance.
        </p>

        {/* Functions */}
        <section className="mb-16" id="functions">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              01
            </span>
            Functions
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Functions are declared with the pattern:{" "}
            <code className="text-tertiary font-mono">
              isim fonksiyon olsun params alsın {"{ ... }"}
            </code>
            . The <code className="text-tertiary font-mono">alsın</code>{" "}
            keyword (meaning &ldquo;taking&rdquo;) introduces the parameter
            list.
          </p>
          <CodeBlock code={functionCode} filename="fonksiyon.huma" />

          {/* Keyword table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Token
                  </th>
                  <th className="text-left py-3 pr-8 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Meaning
                  </th>
                  <th className="text-left py-3 text-on-surface-variant/60 font-semibold text-xs uppercase tracking-widest">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs divide-y divide-outline-variant/10">
                {[
                  ["fonksiyon olsun", "function", "Declares a function"],
                  ["alsın", "takes / params", "Introduces parameter list"],
                  ["döndür", "return", "Returns a value from a function"],
                ].map(([token, meaning, role]) => (
                  <tr key={token}>
                    <td className="py-3 pr-8 text-primary">{token}</td>
                    <td className="py-3 pr-8 text-tertiary">{meaning}</td>
                    <td className="py-3 text-on-surface-variant font-body">
                      {role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Classes */}
        <section className="mb-16" id="classes">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              02
            </span>
            Classes & Objects
          </h2>
          <p className="mb-6 text-on-surface-variant">
            Classes are blueprints declared with{" "}
            <code className="text-tertiary font-mono">sınıf olsun</code>.
            Properties are defined like regular variables with{" "}
            <code className="text-tertiary font-mono">olsun</code>. Use{" "}
            <code className="text-tertiary font-mono">kendisi&apos;nin</code>{" "}
            to access instance properties (equivalent to{" "}
            <code className="text-tertiary font-mono">self.</code> or{" "}
            <code className="text-tertiary font-mono">this.</code>).
          </p>
          <CodeBlock code={classCode} filename="sınıf.huma" />

          <div className="bg-surface-container-low border-l-4 border-tertiary p-6 rounded-r-lg mt-4">
            <div className="flex items-center gap-3 mb-2 text-tertiary">
              <span className="material-symbols-outlined text-lg">info</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Method Syntax
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Methods inside a class are regular functions scoped to the class
              body. They always have implicit access to{" "}
              <code className="text-primary font-mono">kendisi</code> (self).
              There is no special {"`"}constructor{"`"} keyword — initialization
              is done by assigning to properties after instantiation.
            </p>
          </div>
        </section>

        {/* Combined */}
        <section className="mb-16" id="combined">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-sm font-mono text-primary">
              03
            </span>
            Combined Example
          </h2>
          <p className="mb-6 text-on-surface-variant">
            A class with a method that computes the area of a circle,
            demonstrating properties, methods, and{" "}
            <code className="text-tertiary font-mono">kendisi</code> access.
          </p>
          <CodeBlock code={combinedCode} filename="geometri.huma" />
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href="/docs/syntax"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Basic Syntax
          </Link>
          <Link
            href="/docs/lists-errors"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Lists & Error Handling
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          On this page
        </h5>
        <ul className="space-y-4 text-xs font-medium">
          {[
            { href: "#functions", label: "Functions" },
            { href: "#classes", label: "Classes & Objects" },
            { href: "#combined", label: "Combined Example" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-on-surface-variant/60 border-l-2 border-transparent pl-4 hover:text-on-surface hover:border-primary transition-all block"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
