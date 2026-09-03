import Image from "next/image";
import { images } from "@/lib/images";

export default function AboutMotp() {
  return (
    <section id="about" className="container-page py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">About MOTP</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            A gathering built on one conviction: men ought to pray.
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            Men Ought to Pray (MOTP) exists to call men back to the table, the place where
            burdens are laid down and strength is renewed. It&rsquo;s not a conference about
            performance or platform. It&rsquo;s a breakfast meeting: unhurried, honest, and
            centered on prayer.
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">
            We believe every man carries more than he shows, and that the answer was never to
            carry it alone. So we gather: fathers and sons, leaders and students, the confident
            and the uncertain, around food, the Word, and united prayer, taking seriously the
            charge of Luke 18:1, that men ought always to pray, and not faint.
          </p>
        </div>

        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl shadow-black/10 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src={images.aboutGathering}
            alt="Men gathered together in worship"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
