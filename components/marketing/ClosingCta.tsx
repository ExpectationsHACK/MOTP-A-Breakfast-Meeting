import Image from "next/image";
import { images } from "@/lib/images";

const chain = [
  "One praying father can influence generations.",
  "One praying leader can change the direction of an organization.",
  "One praying entrepreneur can build with wisdom instead of fear.",
  "One praying husband can bring spiritual leadership back into his home.",
  "One praying man can stand when others fall.",
];

export default function ClosingCta() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={images.closingFlame} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="container-page relative max-w-2xl text-center">
        <p className="eyebrow text-[#f0bd6c]">One Man Can Change a Family</p>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight text-[#f7f1e4]">
          It starts with prayer.
        </h2>
        <ul className="mt-8 space-y-2 text-[#d9cfc0]">
          {chain.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <p className="mt-10 font-display text-2xl sm:text-3xl font-bold text-[#f7f1e4]">
          Men Ought to Pray. <span className="text-[#f0bd6c]">Don&rsquo;t faint.</span>
        </p>

        <a
          href="#register-bottom"
          className="mt-8 inline-flex justify-center rounded-full bg-ember-bright px-10 py-4 font-semibold text-[#1a1206] hover:bg-ember-deep hover:scale-[1.03] active:scale-[0.98] transition-all"
        >
          Reserve My Seat
        </a>
      </div>
    </section>
  );
}
