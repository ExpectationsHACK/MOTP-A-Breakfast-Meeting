import Image from "next/image";
import { images } from "@/lib/images";

const offerings = [
  "A table.",
  "A brotherhood.",
  "A time of prayer.",
  "A moment to breathe.",
  "A place to hear God's Word.",
  "A place to bring the burdens you've been carrying and trust God with them.",
];

export default function TheProblem() {
  return (
    <section className="container-page py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">The Problem</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            You don&rsquo;t have to keep carrying it alone.
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            This is not a gathering where men come to prove how strong they are. It is a gathering
            where men come to the One who gives strength. There is a place where men can come
            without pretending.
          </p>
          <ul className="mt-6 space-y-2.5">
            {offerings.map((line, i) => {
              const dots = ["bg-ember", "bg-[var(--accent-rust)]", "bg-[var(--accent-gold)]", "bg-[var(--accent-brown)]"];
              return (
                <li key={line} className="flex items-center gap-3 font-display text-ink">
                  <span className={`h-2 w-2 rounded-full ${dots[i % dots.length]}`} />
                  {line}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-ink-muted leading-relaxed italic">
            Because sometimes the greatest act of strength is knowing when to return to God.
          </p>
        </div>

        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl shadow-black/10 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src={images.brotherhood}
            alt="Two men in a warm embrace, one comforting the other"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
