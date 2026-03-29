import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="max-w-[1440px] mx-auto flex pt-16 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex min-w-0">
          {children}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-[#0E0E0E] w-full py-12 border-t border-[#5A413A]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 max-w-[1440px] mx-auto">
          <p className="font-body text-xs uppercase tracking-[0.1em] text-on-surface-variant/60">
            © 2026 Hüma Language Foundation. Kinetic Archive Edition.
          </p>
          <div className="flex gap-8 font-body text-xs uppercase tracking-[0.1em]">
            <Link href="https://github.com/VastSea0/huma-lang" target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">GitHub</Link>
            <Link href="https://github.com/VastSea0/huma-lang/discussions" target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">Discord</Link>
            <Link href="https://github.com/VastSea0/huma-lang/releases" target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">Releases</Link>
            <Link href="https://github.com/VastSea0/huma-lang/issues" target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">Issues</Link>
            <Link href="https://github.com/VastSea0/huma-lang/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant/60 hover:text-primary transition-colors">License</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
