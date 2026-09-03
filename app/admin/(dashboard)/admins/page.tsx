import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CreateAdminForm from "@/components/admin/CreateAdminForm";
import RemoveAdminButton from "@/components/admin/RemoveAdminButton";

export default async function AdminsPage() {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") redirect("/admin");

  const admins = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { assigned: true } } },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-display text-2xl font-bold mb-6">Admins</h1>
        <div className="rounded-2xl border border-line divide-y divide-line overflow-hidden">
          {admins.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  {a.name} {a.id === session.user.id && <span className="text-ink-faint">(you)</span>}
                </p>
                <p className="text-xs text-ink-faint">{a.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs rounded-full border border-line-strong px-3 py-1 text-ink-muted">
                  {a.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                </span>
                <span className="text-xs text-ink-faint">{a._count.assigned} assigned</span>
                {a.id !== session.user.id && <RemoveAdminButton userId={a.id} name={a.name} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold mb-4">Add an Admin</h2>
        <div className="rounded-2xl border border-line-strong bg-bg-raised/50 p-6">
          <CreateAdminForm />
        </div>
      </div>
    </div>
  );
}
