import Image from "next/image";
import { images } from "@/lib/images";
import Countdown from "./Countdown";

const EVENT_DATE_ISO = process.env.EVENT_DATE_ISO ?? "2026-09-19T09:00:00+01:00";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="absolute inset-0">
        <Image
          src={images.heroBackground}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]" />
      </div>

      <div className="container-page relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="eyebrow text-[#f0bd6c]">A Men&rsquo;s Prayer Breakfast Meeting</p>

          <h1 className="mt-5 font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl text-[#f7f1e4]">
            You&rsquo;ve Been Strong for Everyone.
            <br />
            <span className="text-[#f0bd6c]">But Who Is Strengthening You?</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-[#d9cfc0] leading-relaxed">
            There are battles you don&rsquo;t talk about: the pressure to provide, the weight of
            leading, the silent question of whether you&rsquo;re becoming the man you were called
            to be. Come step away from the noise, lay the weight down, and receive fresh strength.
          </p>

          <p className="mt-6 font-display italic text-[#f7f1e4] text-lg border-l-2 border-[#f0bd6c] pl-4">
            &ldquo;Men ought always to pray, and not to faint.&rdquo; (Luke 18:1)
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#register"
              className="inline-flex justify-center rounded-full bg-ember-bright px-8 py-4 font-semibold text-[#1a1206] hover:bg-ember-deep hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              Register for the Breakfast Meeting
            </a>
            <a
              href="#details"
              className="inline-flex justify-center rounded-full border border-white/30 px-8 py-4 font-semibold text-[#f7f1e4] hover:bg-white/10 transition-colors"
            >
              See Date &amp; Venue
            </a>
          </div>

          <div className="mt-14 max-w-xl">
            <p className="eyebrow text-[#f0bd6c] mb-3">Count down to the Breakfast Meeting</p>
            <Countdown targetIso={EVENT_DATE_ISO} />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden rotate-2 shadow-2xl ring-1 ring-white/10">
            <Image
              src={images.heroPortrait}
              alt="Two men embracing in an emotional moment of prayer"
              fill
              className="object-cover"
              sizes="35vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-8 rounded-2xl bg-[var(--bg-raised)] px-5 py-4 shadow-xl -rotate-2 max-w-[15rem]">
            <p className="font-display text-sm font-semibold text-ink leading-snug">
              &ldquo;For the first time in a long time, I didn&rsquo;t feel alone.&rdquo;
            </p>
            <p className="mt-1.5 text-xs text-ink-faint">Real men. Real prayer.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
