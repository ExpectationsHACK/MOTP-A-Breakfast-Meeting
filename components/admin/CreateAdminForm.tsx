"use client";

import { useActionState } from "react";
import { createAdmin, type CreateAdminState } from "@/app/admin/(dashboard)/admins/actions";

const initialState: CreateAdminState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-line-strong bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-ember";

export default function CreateAdminForm() {
  const [state, formAction, pending] = useActionState(createAdmin, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-wider text-ink-faint mb-1.5">Name</label>
        <input name="name" required className={inputClass} />
        {state.fieldErrors?.name && <p className="mt-1 text-xs text-red-400">{state.fieldErrors.name}</p>}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-ink-faint mb-1.5">Email</label>
        <input name="email" type="email" required className={inputClass} />
        {state.fieldErrors?.email && <p className="mt-1 text-xs text-red-400">{state.fieldErrors.email}</p>}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-ink-faint mb-1.5">Temporary Password</label>
        <input name="password" required minLength={8} className={inputClass} />
        {state.fieldErrors?.password && <p className="mt-1 text-xs text-red-400">{state.fieldErrors.password}</p>}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-ink-faint mb-1.5">Role</label>
        <select name="role" defaultValue="ADMIN" className={inputClass}>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
      </div>

      {state.message && (
        <p className={`text-sm ${state.status === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ember-bright px-5 py-2.5 text-sm font-semibold text-[#1a1206] disabled:opacity-60"
      >
        {pending ? "Adding..." : "Add Admin"}
      </button>
    </form>
  );
}
