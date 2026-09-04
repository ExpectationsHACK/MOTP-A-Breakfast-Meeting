import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Download, Search, Church } from "lucide-react";
import StatusSelect from "@/components/admin/StatusSelect";
import AssignSelect from "@/components/admin/AssignSelect";
import PromoteButton from "@/components/admin/PromoteButton";
import DeleteButton from "@/components/admin/DeleteButton";
import ContactLinks from "@/components/admin/ContactLinks";
import type { RegistrantStatus } from "@prisma/client";

export default async function RegistrantsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; admin?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  const isSuper = session!.user.role === "SUPER_ADMIN";

  const where: Record<string, unknown> = {};

  if (!isSuper) {
    where.assignedAdminId = session!.user.id;
  } else if (params.admin === "unassigned") {
    where.assignedAdminId = null;
  } else if (params.admin) {
    where.assignedAdminId = params.admin;
  }

  if (params.status) where.status = params.status as RegistrantStatus;

  if (params.q) {
    where.OR = [
      { fullName: { contains: params.q } },
      { phone: { contains: params.q } },
      { email: { contains: params.q } },
    ];
  }

  const [registrants, admins] = await Promise.all([
    prisma.registrant.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { assignedAdmin: { select: { id: true, name: true } } },
    }),
    isSuper ? prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }) : Promise.resolve([]),
  ]);

  const exportParams = new URLSearchParams();
  if (params.q) exportParams.set("q", params.q);
  if (params.status) exportParams.set("status", params.status);
  if (params.admin) exportParams.set("admin", params.admin);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold">Registrants</h1>
        <a
          href={`/api/admin/export?${exportParams.toString()}`}
          className="flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-ink hover:bg-bg-raised"
        >
          <Download size={15} /> Export CSV
        </a>
      </div>

      <form className="flex flex-wrap gap-3" method="get">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            name="q"
            defaultValue={params.q}
            placeholder="Search name, phone, email..."
            className="w-full rounded-xl border border-line-strong bg-bg-raised/50 pl-9 pr-3 py-2.5 text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-ember"
          />
        </div>
        <select
          name="status"
          defaultValue={params.status ?? ""}
          className="rounded-xl border border-line-strong bg-bg-raised/50 px-3 py-2.5 text-sm"
        >
          <option value="">All statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="ATTENDED">Attended</option>
        </select>
        {isSuper && (
          <select
            name="admin"
            defaultValue={params.admin ?? ""}
            className="rounded-xl border border-line-strong bg-bg-raised/50 px-3 py-2.5 text-sm"
          >
            <option value="">All admins</option>
            <option value="unassigned">Unassigned</option>
            {admins.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        )}
        <button
          type="submit"
          className="rounded-xl bg-ember-bright px-5 py-2.5 text-sm font-semibold text-[#1a1206]"
        >
          Filter
        </button>
      </form>

      {/* Mobile: card list */}
      <div className="space-y-3 md:hidden">
        {registrants.map((r) => (
          <div key={r.id} className="rounded-2xl border border-line-strong bg-bg-raised/40 p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/admin/registrants/${r.id}`}
                  className="font-display font-semibold text-ink hover:text-ember break-words"
                >
                  {r.fullName}
                </Link>
                {r.homeChurch && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                    <Church size={12} className="shrink-0 text-ember" /> {r.homeChurch}
                  </p>
                )}
              </div>
              <StatusSelect registrantId={r.id} value={r.status} />
            </div>

            <div className="flex items-center gap-2">
              <ContactLinks phone={r.phone} />
              <span className="text-sm text-ink-muted">{r.phone}</span>
            </div>

            {r.prayerFocus && (
              <p className="border-l-2 border-ember/50 pl-3 text-xs italic text-ink-muted line-clamp-3">
                &ldquo;{r.prayerFocus}&rdquo;
              </p>
            )}

            {isSuper && (
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-wider text-ink-faint">Assigned to</p>
                <AssignSelect registrantId={r.id} adminId={r.assignedAdminId} admins={admins} />
              </div>
            )}

            <div className="flex items-center justify-between border-t border-line pt-3">
              <span className="text-xs text-ink-faint">
                {r.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <div className="flex items-center gap-2">
                {isSuper && <PromoteButton registrantId={r.id} disabled={!!r.promotedUserId} />}
                {isSuper && <DeleteButton registrantId={r.id} name={r.fullName} />}
              </div>
            </div>
          </div>
        ))}
        {registrants.length === 0 && (
          <p className="rounded-2xl border border-line p-8 text-center text-sm text-ink-muted">
            No registrants match these filters.
          </p>
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
        <table className="w-full text-sm">
          <thead className="bg-bg-raised/60 text-left text-xs uppercase tracking-wider text-ink-faint">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Believing God For</th>
              <th className="px-4 py-3">Status</th>
              {isSuper && <th className="px-4 py-3">Assigned To</th>}
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {registrants.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 max-w-[14rem]">
                  <Link href={`/admin/registrants/${r.id}`} className="font-medium text-ink hover:text-ember">
                    {r.fullName}
                  </Link>
                  {r.homeChurch && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                      <Church size={11} className="shrink-0 text-ember" />
                      <span className="truncate">{r.homeChurch}</span>
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ContactLinks phone={r.phone} />
                    <span className="text-ink-muted text-xs">{r.phone}</span>
                  </div>
                </td>
                <td className="px-4 py-3 max-w-[16rem]">
                  {r.prayerFocus ? (
                    <p className="line-clamp-2 text-xs italic text-ink-muted" title={r.prayerFocus}>
                      &ldquo;{r.prayerFocus}&rdquo;
                    </p>
                  ) : (
                    <span className="text-xs text-ink-faint">&mdash;</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusSelect registrantId={r.id} value={r.status} />
                </td>
                {isSuper && (
                  <td className="px-4 py-3">
                    <AssignSelect registrantId={r.id} adminId={r.assignedAdminId} admins={admins} />
                  </td>
                )}
                <td className="px-4 py-3 text-ink-faint text-xs">
                  {r.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {isSuper && <PromoteButton registrantId={r.id} disabled={!!r.promotedUserId} />}
                    {isSuper && <DeleteButton registrantId={r.id} name={r.fullName} />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {registrants.length === 0 && (
          <p className="p-8 text-center text-sm text-ink-muted">No registrants match these filters.</p>
        )}
      </div>
    </div>
  );
}
