"use client";

import { useTransition } from "react";
import { assignRegistrant } from "@/app/admin/(dashboard)/registrants/actions";

export default function AssignSelect({
  registrantId,
  adminId,
  admins,
}: {
  registrantId: string;
  adminId: string | null;
  admins: { id: string; name: string }[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={adminId ?? ""}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          assignRegistrant(registrantId, e.target.value || null);
        })
      }
      className="rounded-lg border border-line-strong bg-bg px-2.5 py-1.5 text-xs text-ink-muted disabled:opacity-50"
    >
      <option value="">Unassigned</option>
      {admins.map((a) => (
        <option key={a.id} value={a.id} className="bg-bg text-ink">
          {a.name}
        </option>
      ))}
    </select>
  );
}
