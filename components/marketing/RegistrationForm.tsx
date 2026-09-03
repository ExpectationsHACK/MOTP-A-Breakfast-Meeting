"use client";

import { useActionState } from "react";
import { useRef, useEffect } from "react";
import { registerAttendee, type RegistrationState } from "@/app/register/actions";
import { CheckCircle2 } from "lucide-react";

const initialState: RegistrationState = { status: "idle" };

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-ink-faint font-normal"> (optional)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-ember";

export default function RegistrationForm() {
  const [state, formAction, pending] = useActionState(registerAttendee, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-ember/40 bg-bg-raised/70 p-10 text-center">
        <CheckCircle2 className="mx-auto text-ember" size={40} />
        <h3 className="mt-4 font-display text-2xl font-bold">You&rsquo;re on the list.</h3>
        <p className="mt-2 text-ink-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <Field id="fullName" label="Full Name" error={state.fieldErrors?.fullName}>
        <input id="fullName" name="fullName" type="text" required className={inputClass} placeholder="John Adeyemi" />
      </Field>

      <Field id="phone" label="Phone Number" error={state.fieldErrors?.phone}>
        <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="080..." />
      </Field>

      <Field id="email" label="Email" optional error={state.fieldErrors?.email}>
        <input id="email" name="email" type="email" className={inputClass} placeholder="you@example.com" />
      </Field>

      <Field id="homeChurch" label="Church / Fellowship" optional error={state.fieldErrors?.homeChurch}>
        <input id="homeChurch" name="homeChurch" type="text" className={inputClass} placeholder="Where do you fellowship?" />
      </Field>

      <Field
        id="prayerFocus"
        label="What are you believing God for at this breakfast meeting?"
        optional
        error={state.fieldErrors?.prayerFocus}
      >
        <textarea
          id="prayerFocus"
          name="prayerFocus"
          rows={3}
          className={inputClass}
          placeholder="Come as you are. This stays between you and the team praying for you."
        />
      </Field>

      {state.status === "error" && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ember-bright px-8 py-4 font-semibold text-[#1a1206] hover:bg-ember-deep transition-colors disabled:opacity-60"
      >
        {pending ? "Reserving your seat..." : "Reserve My Seat"}
      </button>

      <p className="text-center text-xs text-ink-faint">
        We&rsquo;ll only use this to confirm your seat and follow up about the breakfast meeting.
      </p>
    </form>
  );
}
