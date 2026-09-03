import { Check, UtensilsCrossed } from "lucide-react";

const groups: { title: string; chip: string; items: string[] }[] = [
  {
    title: "Transformation",
    chip: "chip-amber",
    items: [
      "Renewed strength for the road ahead",
      "A rekindled, fervent prayer life",
      "Freedom from carrying the weight alone",
    ],
  },
  {
    title: "Results",
    chip: "chip-rust",
    items: [
      "Clarity for decisions you cannot afford to get wrong",
      "Fresh grace to lead your home and work",
      "Brothers who will actually check on you",
    ],
  },
  {
    title: "What's Included",
    chip: "chip-gold",
    items: [
      "Worship, the Word, and focused prayer",
      "A seat held just for you",
      "A full breakfast, on us",
    ],
  },
];

export default function RegistrationCard() {
  return (
    <section className="container-page pb-24 sm:pb-32">
      <div className="mx-auto max-w-lg rounded-[2rem] border border-line-strong bg-bg-raised shadow-2xl shadow-black/10 overflow-hidden transition-transform duration-500 hover:-translate-y-1">
        <div className="bg-gradient-to-br from-ember-bright to-[var(--accent-rust)] px-8 py-10 text-center text-[#1a1206]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-80">Your Invitation</p>
          <h3 className="mt-2 font-display text-2xl font-bold">The Full Experience</h3>
          <p className="pulse-ring mt-4 inline-flex items-center justify-center rounded-full bg-[#1a1206] px-6 py-2 font-display text-3xl font-extrabold text-[#f7f1e4]">
            FREE
          </p>
          <p className="mt-3 text-sm font-medium opacity-90">Every man. No cost. No catch.</p>
        </div>

        <div className="p-6 sm:p-8 space-y-7">
          {groups.map((group) => (
            <div key={group.title}>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${group.chip}`}>
                {group.title}
              </span>
              <ul className="mt-3 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                    <Check size={16} className="mt-0.5 shrink-0 text-ember" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex items-center gap-2.5 rounded-xl chip-gold px-4 py-3 text-sm font-semibold">
            <UtensilsCrossed size={16} />
            Free breakfast included for every registrant
          </div>

          <a
            href="#register"
            className="block text-center rounded-full bg-ember-bright px-8 py-4 font-semibold text-[#1a1206] hover:bg-ember-deep hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Registration Is Free &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
