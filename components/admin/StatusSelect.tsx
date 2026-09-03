"use client";

import { useTransition } from "react";
import { updateStatus } from "@/app/admin/(dashboard)/registrants/actions";
import type { RegistrantStatus } from "@prisma/client";

const options: RegistrantStatus[] = ["NEW", "CONTACTED", "CONFIRMED", "ATTENDED"];

const styles: Record<RegistrantStatus, string> = {
  NEW: "text-ink-muted border-line-strong",
  CONTACTED: "text-ember border-ember/50",
  CONFIRMED: "text-emerald-400 border-emerald-400/40",
  ATTENDED: "text-sky-400 border-sky-400/40",
};

export default function StatusSelect({
  registrantId,
  value,
}: {
  registrantId: string;
  value: RegistrantStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          updateStatus(registrantId, e.target.value as RegistrantStatus);
        })
      }
      className={`rounded-lg border bg-bg px-2.5 py-1.5 text-xs font-medium capitalize disabled:opacity-50 ${styles[value]}`}
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-bg text-ink">
          {o.charAt(0) + o.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
}
