"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { removeAdmin } from "@/app/admin/(dashboard)/admins/actions";

export default function RemoveAdminButton({ userId, name }: { userId: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Remove ${name} as an admin? Their assigned registrants will become unassigned.`)) {
          startTransition(() => {
            removeAdmin(userId);
          });
        }
      }}
      className="flex items-center gap-1.5 rounded-lg border border-line-strong px-2.5 py-1.5 text-xs text-ink-muted hover:text-red-400 hover:border-red-400/50 disabled:opacity-40"
    >
      <Trash2 size={13} /> Remove
    </button>
  );
}
