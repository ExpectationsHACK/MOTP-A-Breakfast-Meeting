import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ArrowLeft, Church } from "lucide-react";
import StatusSelect from "@/components/admin/StatusSelect";
import AssignSelect from "@/components/admin/AssignSelect";
import PromoteButton from "@/components/admin/PromoteButton";
import ContactLinks from "@/components/admin/ContactLinks";
import { addFollowUpNote } from "../actions";

export default async function RegistrantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const isSuper = session!.user.role === "SUPER_ADMIN";

  const registrant = await prisma.registrant.findUnique({
    where: { id },
    include: {
      assignedAdmin: { select: { id: true, name: true } },
      notes: { orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } },
    },
  });

  if (!registrant) notFound();
  if (!isSuper && registrant.assignedAdminId !== session!.user.id) notFound();

  const admins = isSuper
    ? await prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } })
    : [];

  const addNote = addFollowUpNote.bind(null, registrant.id);

  return (
    <div className="max-w-3xl space-y-8">
      <Link href="/admin/registrants" className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft size={15} /> Back to registrants
      </Link>

      <div className="rounded-2xl border border-line-strong bg-bg-raised/50 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">{registrant.fullName}</h1>
            <p className="mt-1 text-ink-muted text-sm">{registrant.phone}</p>
            {registrant.email && <p className="text-ink-muted text-sm">{registrant.email}</p>}
          </div>
          <ContactLinks phone={registrant.phone} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-faint mb-1.5">Status</p>
            <StatusSelect registrantId={registrant.id} value={registrant.status} />
          </div>
          {isSuper && (
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-faint mb-1.5">Assigned To</p>
              <AssignSelect registrantId={registrant.id} adminId={registrant.assignedAdminId} admins={admins} />
            </div>
          )}
          {registrant.homeChurch && (
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-faint mb-1.5">Church / Fellowship</p>
              <p className="flex items-center gap-1.5 text-sm text-ink">
                <Church size={14} className="shrink-0 text-ember" /> {registrant.homeChurch}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-faint mb-1.5">Registered</p>
            <p className="text-sm text-ink">
              {registrant.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
        </div>

        {registrant.prayerFocus && (
          <div className="mt-6 rounded-xl border border-line bg-bg p-4">
            <p className="text-xs uppercase tracking-wider text-ink-faint mb-1.5">
              What they&rsquo;re believing God for
            </p>
            <p className="text-sm text-ink-muted italic">&ldquo;{registrant.prayerFocus}&rdquo;</p>
          </div>
        )}

        {isSuper && (
          <div className="mt-6">
            <PromoteButton registrantId={registrant.id} disabled={!!registrant.promotedUserId} />
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold mb-4">Follow-Up Notes</h2>
        <form action={addNote} className="flex gap-3 mb-6">
          <input
            type="text"
            name="body"
            required
            placeholder="Log a call, a text, a prayer point..."
            className="flex-1 rounded-xl border border-line-strong bg-bg-raised/50 px-4 py-2.5 text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-ember"
          />
          <button type="submit" className="rounded-xl bg-ember-bright px-5 py-2.5 text-sm font-semibold text-[#1a1206]">
            Add
          </button>
        </form>

        <div className="space-y-3">
          {registrant.notes.length === 0 && (
            <p className="text-sm text-ink-faint">No notes yet. Log your first follow-up above.</p>
          )}
          {registrant.notes.map((note) => (
            <div key={note.id} className="rounded-xl border border-line p-4">
              <p className="text-sm text-ink">{note.body}</p>
              <p className="mt-2 text-xs text-ink-faint">
                {note.author?.name ?? "Unknown"} &middot;{" "}
                {note.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
