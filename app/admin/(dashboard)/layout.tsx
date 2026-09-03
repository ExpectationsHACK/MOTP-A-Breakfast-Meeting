import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { LayoutDashboard, Users, ShieldCheck, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, superOnly: false },
  { href: "/admin/registrants", label: "Registrants", icon: Users, superOnly: false },
  { href: "/admin/admins", label: "Admins", icon: ShieldCheck, superOnly: true },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const isSuper = session.user.role === "SUPER_ADMIN";

  return (
    <div className="min-h-screen bg-bg text-ink flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-line bg-bg-raised/40">
        <div className="p-6">
          <p className="font-display font-bold">
            MEN OUGHT <span className="text-ember">TO PRAY</span>
          </p>
          <p className="mt-1 text-xs text-ink-faint">Admin Console</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems
            .filter((item) => !item.superOnly || isSuper)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-bg-raised hover:text-ink transition-colors"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="p-4 border-t border-line space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-bg-raised hover:text-ink transition-colors"
          >
            <ExternalLink size={16} /> View site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-bg-raised hover:text-ink transition-colors"
            >
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="flex items-center justify-between border-b border-line px-6 py-4 md:hidden">
          <p className="font-display font-bold">
            MOTP <span className="text-ember">Admin</span>
          </p>
        </header>
        <header className="hidden md:flex items-center justify-end gap-3 border-b border-line px-8 py-4">
          <div className="text-right">
            <p className="text-sm text-ink">{session.user.name}</p>
            <p className="text-xs text-ink-faint">
              {isSuper ? "Super Admin" : "Admin"} &middot; {session.user.email}
            </p>
          </div>
        </header>
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
