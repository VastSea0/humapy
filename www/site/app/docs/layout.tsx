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
            {["Twitter", "Discord", "Status", "Security", "Terms"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-on-surface-variant/60 hover:text-primary transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
