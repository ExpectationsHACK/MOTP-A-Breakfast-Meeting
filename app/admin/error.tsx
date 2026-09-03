"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <p className="font-display text-2xl font-bold text-ink">Something didn&rsquo;t load right.</p>
      <p className="max-w-sm text-ink-muted">
        This is usually just a brief hiccup. Please try again in a moment.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-ember-bright px-6 py-3 font-semibold text-[#1a1206] hover:bg-ember-deep transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
