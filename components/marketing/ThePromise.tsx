import Image from "next/image";
import { images } from "@/lib/images";

const lines = [
  "Prayer is where a man receives wisdom for decisions he cannot afford to get wrong.",
  "Prayer is where a leader finds strength to keep leading.",
  "Prayer is where a father receives grace for his family.",
  "Prayer is where a man remembers that his provision comes from God, not his salary, his business or his connections.",
  "Prayer is where purpose becomes clearer.",
  "Prayer is where fear loses its voice.",
  "Prayer is where a tired man can become strong again.",
];

const dots = ["bg-ember", "bg-[var(--accent-rust)]", "bg-[var(--accent-gold)]", "bg-[var(--accent-brown)]"];

export default function ThePromise() {
  return (
    <section className="py-24 sm:py-32 bg-bg-alt border-y border-line">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden order-2 lg:order-1 shadow-xl shadow-black/10 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src={images.promiseGathering}
            alt="Men gathered together in worship"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow">The Promise</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            Because prayer is how men refuse to faint.
          </h2>
          <p className="mt-4 font-display italic text-lg text-ink border-l-2 border-ember pl-4">
            &ldquo;Men ought always to pray, and not to faint.&rdquo; (Luke 18:1)
          </p>
          <p className="mt-6 text-ink-muted">
            Prayer is not weakness. Prayer is where strength is renewed.
          </p>
          <ul className="mt-6 space-y-3">
            {lines.map((line, i) => (
              <li key={line} className="flex gap-3 text-ink-muted leading-relaxed">
                <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dots[i % dots.length]}`} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
