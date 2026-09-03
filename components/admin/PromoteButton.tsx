"use client";

import { useActionState, useState } from "react";
import { ShieldPlus } from "lucide-react";
import { promoteToAdmin, type PromoteState } from "@/app/admin/(dashboard)/registrants/actions";

const initialState: PromoteState = { status: "idle" };

export default function PromoteButton({ registrantId, disabled }: { registrantId: string; disabled?: boolean }) {
  const action = promoteToAdmin.bind(null, registrantId);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [dismissed, setDismissed] = useState(false);

  if (state.status === "success" && !dismissed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-sm rounded-2xl border border-ember/40 bg-bg-raised p-6">
          <h3 className="font-display text-lg font-bold text-ember">Admin created</h3>
          <p className="mt-2 text-sm text-ink-muted">{state.message}</p>
          <p className="mt-4 text-xs text-ink-faint">Temporary password (shown once):</p>
          <p className="mt-1 font-mono text-lg text-ink select-all bg-bg rounded-lg px-3 py-2 border border-line-strong">
            {state.password}
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="mt-5 w-full rounded-full bg-ember-bright px-4 py-2 text-sm font-semibold text-[#1a1206]"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={disabled || pending}
        title={disabled ? "Already an admin" : "Promote to admin"}
        className="flex items-center gap-1.5 rounded-lg border border-line-strong px-2.5 py-1.5 text-xs text-ink-muted hover:text-ink hover:border-ember/50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ShieldPlus size={14} /> {pending ? "Working..." : "Promote"}
      </button>
      {state.status === "error" && <p className="mt-1 text-xs text-red-400">{state.message}</p>}
    </form>
  );
}
