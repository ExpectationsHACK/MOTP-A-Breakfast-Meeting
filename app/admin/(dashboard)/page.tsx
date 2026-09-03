import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Users, PhoneCall, UserCheck, Clock } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();
  const isSuper = session!.user.role === "SUPER_ADMIN";
  const scope = isSuper ? {} : { assignedAdminId: session!.user.id };

  const [total, contacted, unassigned, recent] = await Promise.all([
    prisma.registrant.count({ where: scope }),
    prisma.registrant.count({ where: { ...scope, status: { in: ["CONTACTED", "CONFIRMED", "ATTENDED"] } } }),
    isSuper ? prisma.registrant.count({ where: { assignedAdminId: null } }) : Promise.resolve(null),
    prisma.registrant.findMany({
      where: scope,
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { assignedAdmin: { select: { name: true } } },
    }),
  ]);

  const stats = [
    { label: isSuper ? "Total Registrants" : "Assigned to You", value: total, icon: Users, chip: "chip-amber" },
    { label: "Contacted / Confirmed", value: contacted, icon: PhoneCall, chip: "chip-rust" },
    ...(isSuper ? [{ label: "Unassigned", value: unassigned ?? 0, icon: UserCheck, chip: "chip-gold" }] : []),
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold">
          Welcome, {session!.user.name?.split(" ")[0]}.
        </h1>
        <p className="mt-1 text-ink-muted text-sm">
          Saturday, September 19, 2026 &middot; 9:00 AM
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 max-w-2xl">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="feature-card rounded-2xl border border-line bg-bg-raised p-5 shadow-sm"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className={`feature-card-icon mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${s.chip}`}>
              <s.icon size={16} />
            </div>
            <p className="text-ink-faint text-xs uppercase tracking-wider">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold">Recent Registrations</h2>
          <Link href="/admin/registrants" className="text-sm text-ember hover:underline">
            View all &rarr;
          </Link>
        </div>
        <div className="rounded-2xl border border-line divide-y divide-line overflow-hidden">
          {recent.length === 0 && (
            <p className="p-6 text-sm text-ink-muted flex items-center gap-2">
              <Clock size={14} /> No registrations yet.
            </p>
          )}
          {recent.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-ink text-sm font-medium">{r.fullName}</p>
                <p className="text-ink-faint text-xs">{r.phone}</p>
              </div>
              <span className="text-xs rounded-full border border-line-strong px-3 py-1 text-ink-muted">
                {r.assignedAdmin?.name ?? "Unassigned"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
