"use client";

import { useEffect, useState } from "react";

function getParts(target: number) {
  const diff = Math.max(0, target - Date.now());
  const day = 1000 * 60 * 60 * 24;
  return {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    done: diff <= 0,
  };
}

export default function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [parts, setParts] = useState<ReturnType<typeof getParts> | null>(null);

  useEffect(() => {
    const tick = () => setParts(getParts(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { label: "Days", value: parts?.days },
    { label: "Hours", value: parts?.hours },
    { label: "Minutes", value: parts?.minutes },
    { label: "Seconds", value: parts?.seconds },
  ];

  if (parts?.done) {
    return (
      <p className="font-display text-2xl text-ember">The doors are open. We&rsquo;re praying now.</p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4" role="timer" aria-label="Countdown to the breakfast meeting">
      {cells.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-line-strong bg-bg-raised/80 px-2 py-4 sm:px-4 sm:py-6 text-center"
        >
          <div className="font-mono text-3xl sm:text-5xl font-bold text-ember tabular-nums">
            {c.value === undefined ? "--" : String(c.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink-muted">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
