"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { images } from "@/lib/images";

const faqs = [
  {
    q: "Who is this breakfast meeting for?",
    a: "This gathering is for men of all ages and backgrounds: fathers, husbands, single men, young men, professionals, entrepreneurs, pastors, ministers, students, business owners and every man who desires to grow stronger in God.",
  },
  {
    q: "Do I have to be a pastor or church leader?",
    a: "No. This is for every man.",
  },
  {
    q: "What should I expect?",
    a: "Expect breakfast, fellowship, biblical teaching, worship and focused prayer around the realities men face in life, family, leadership, finances and purpose.",
  },
  {
    q: "Is there a registration fee?",
    a: "No, this breakfast meeting is free to attend. Just register below so we can prepare a seat and a plate for you.",
  },
  {
    q: "Can I invite another man?",
    a: "Absolutely. Don't come alone. Think of one man who needs encouragement, strength, direction or a fresh encounter with God, and invite him.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={images.faqTexture} alt="" fill className="object-cover opacity-[0.06]" sizes="100vw" />
      </div>

      <div className="container-page relative max-w-2xl mx-auto">
        <p className="eyebrow text-center">Frequently Asked Questions</p>
        <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl font-bold">
          Good to know before you come.
        </h2>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display font-semibold text-ink">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ember transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && <p className="pb-5 text-ink-muted leading-relaxed">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
