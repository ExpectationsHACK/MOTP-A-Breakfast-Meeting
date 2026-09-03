import SectionHeading from "./SectionHeading";

const topics = [
  { title: "Our Walk With God", description: "That men will return to a place of intimacy, prayer and spiritual strength." },
  { title: "Our Families", description: "For wisdom, protection, provision, unity and grace to lead our homes well." },
  { title: "Our Finances & Businesses", description: "For wisdom, open doors, sustainable provision, integrity and financial breakthrough." },
  { title: "Our Leadership", description: "For wisdom to lead, courage to make decisions and grace to carry responsibility." },
  { title: "Our Purpose", description: "For clarity concerning God's assignment and the courage to pursue it." },
  { title: "Our Future", description: "For divine direction in the decisions and seasons ahead." },
  { title: "Our Inner Lives", description: "For healing from disappointment, fear, failure, shame and every burden that has quietly weakened us." },
];

const accents = ["chip-amber", "chip-rust", "chip-gold", "chip-brown"];

export default function WhatWePrayAbout() {
  return (
    <section className="py-24 sm:py-32 bg-bg-alt border-y border-line">
      <div className="container-page">
        <SectionHeading eyebrow="What We Will Pray About" title="Together, united, for the things that matter." center />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {topics.map((t, i) => (
            <div
              key={t.title}
              className="feature-card rounded-2xl border border-line bg-bg-raised p-6 shadow-sm"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${accents[i % accents.length]}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display font-semibold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
