"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowDownToLine } from "lucide-react";
import { site } from "@/lib/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between">
        <a href="#top" className="font-mono text-sm text-paper">
          {site.name.toLowerCase().replace(/\s+/g, "-")}
          <span className="text-signal">/</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.12em] text-fog">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-paper">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={site.resumeUrl}
          download
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:border-signal hover:text-signal"
        >
          Résumé
          <ArrowDownToLine size={14} />
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden text-paper"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-ink px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4 font-mono text-sm uppercase tracking-[0.12em] text-fog">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 transition-colors hover:text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resumeUrl}
                download
                className="mt-2 inline-flex items-center gap-2 text-signal"
              >
                Download résumé
                <ArrowDownToLine size={14} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
