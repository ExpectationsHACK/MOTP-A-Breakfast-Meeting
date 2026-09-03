"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteRegistrant } from "@/app/admin/(dashboard)/registrants/actions";

export default function DeleteButton({ registrantId, name }: { registrantId: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Remove ${name} from the registrant list? This can't be undone.`)) {
          startTransition(() => {
            deleteRegistrant(registrantId);
          });
        }
      }}
      title="Delete registrant"
      className="flex items-center gap-1.5 rounded-lg border border-line-strong px-2.5 py-1.5 text-xs text-ink-muted hover:text-red-400 hover:border-red-400/50 disabled:opacity-40"
    >
      <Trash2 size={14} />
    </button>
  );
}
