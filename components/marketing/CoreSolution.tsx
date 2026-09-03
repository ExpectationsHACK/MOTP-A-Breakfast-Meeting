import Image from "next/image";
import { images } from "@/lib/images";

const comeWith = [
  "your questions",
  "your burdens",
  "your uncertainty",
  "your family concerns",
  "your financial needs",
  "your dreams",
  "your disappointments",
];

const pillStyles = ["chip-amber", "chip-rust", "chip-gold", "chip-brown"];

export default function CoreSolution() {
  return (
    <section className="container-page py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl shadow-black/10 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src={images.breakfastMoment}
            alt="A man enjoying a full breakfast"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        </div>

        <div className="rounded-3xl border border-line-strong bg-bg-raised p-8 sm:p-10 shadow-lg shadow-black/5">
          <h3 className="font-display text-2xl font-bold text-ember">The call is simple.</h3>
          <p className="mt-2 font-display text-xl">Come. Sit. Eat. Pray. Be strengthened.</p>
          <p className="mt-6 text-ink-muted leading-relaxed">
            For one morning, step away from the demands. Put the phone down. Leave the office.
            Pause the business. Come to the table just as you are, with:
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {comeWith.map((item, i) => (
              <span
                key={item}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5 ${pillStyles[i % pillStyles.length]}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
