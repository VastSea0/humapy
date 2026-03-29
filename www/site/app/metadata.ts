import type { Metadata } from "next";

// Separate file for home page metadata since page.tsx is a client component
export const homeMetadata: Metadata = {
  title: "Hüma — Code as You Think",
  description:
    "High-performance programming language with native Turkish syntax. Built with a Rust-backed core.",
};
