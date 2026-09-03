"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#why-it-matters", label: "Why It Matters" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About MOTP" },
  { href: "#details", label: "Details" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-bg/90 backdrop-blur border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between py-4">
        <a
          href="#top"
          className={`font-display font-bold text-lg tracking-tight ${solid ? "text-ink" : "text-[#f7f1e4]"}`}
        >
          MEN OUGHT <span className={solid ? "text-ember" : "text-[#f0bd6c]"}>TO PRAY</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                solid ? "text-ink-muted hover:text-ink" : "text-[#e8ddca] hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#register"
            className="rounded-full bg-ember-bright px-5 py-2 text-sm font-semibold text-[#1a1206] hover:bg-ember-deep hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Register
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`md:hidden p-2 -mr-2 ${solid ? "text-ink" : "text-[#f7f1e4]"}`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-ink-muted hover:text-ink border-b border-line/60 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-ember-bright px-5 py-3 text-center text-sm font-semibold text-[#1a1206]"
            >
              Register for the Breakfast Meeting
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
