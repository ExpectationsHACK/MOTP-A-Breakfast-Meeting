"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Menu,
  X,
  LayoutDashboard,
  Users,
  ShieldCheck,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, superOnly: false },
  { href: "/admin/registrants", label: "Registrants", icon: Users, superOnly: false },
  { href: "/admin/admins", label: "Admins", icon: ShieldCheck, superOnly: true },
];

export default function AdminMobileHeader({
  isSuper,
  onSignOut,
}: {
  isSuper: boolean;
  onSignOut: () => Promise<void>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden border-b border-line bg-bg">
      <div className="flex items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-muted hover:text-ink hover:bg-bg-raised"
        >
          <ArrowLeft size={18} />
        </button>
        <p className="font-display font-bold">
          MOTP <span className="text-ember">Admin</span>
        </p>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-muted hover:text-ink hover:bg-bg-raised"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-4 py-3 space-y-1">
          {navItems
            .filter((item) => !item.superOnly || isSuper)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-bg-raised hover:text-ink transition-colors"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-bg-raised hover:text-ink transition-colors"
          >
            <ExternalLink size={16} /> View site
          </Link>
          <form action={onSignOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-bg-raised hover:text-ink transition-colors"
            >
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
