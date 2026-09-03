import { CalendarDays, Clock, MapPin } from "lucide-react";

const VENUE_ADDRESS =
  "18, Oladele Adeniji Street, Beside Totland School, 2nd Mobil Bus Stop, Isawo Road";
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  VENUE_ADDRESS
)}`;

const details = [
  { icon: CalendarDays, label: "Date", value: "Saturday, September 19, 2026", chip: "chip-amber" },
  { icon: Clock, label: "Time", value: "9:00 AM", chip: "chip-rust" },
  { icon: MapPin, label: "Venue", value: VENUE_ADDRESS, chip: "chip-gold" },
];

export default function EventDetails() {
  return (
    <section id="details" className="container-page pt-10 pb-16 sm:pt-14 sm:pb-20">
      <div className="rounded-3xl border border-line-strong bg-bg-raised p-8 sm:p-12 shadow-xl shadow-black/5">
        <p className="eyebrow text-center">
          Men Ought to Pray &middot; A Men&rsquo;s Prayer Breakfast Meeting
        </p>
        <p className="mt-3 text-center font-display italic text-ink-muted">Luke 18:1</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {details.map((d) => (
            <div key={d.label} className="feature-card text-center rounded-2xl p-4">
              <div className={`feature-card-icon mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${d.chip}`}>
                <d.icon size={22} />
              </div>
              <p className="mt-4 eyebrow">{d.label}</p>
              <p className="mt-2 font-display text-lg text-ink leading-snug">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ember-bright px-6 py-3 text-sm font-semibold text-[#1a1206] hover:bg-ember-deep hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <MapPin size={16} /> Get Directions
          </a>
        </div>

        <p className="mt-10 text-center font-display text-ink-muted tracking-wide">
          Breakfast &bull; Worship &bull; The Word &bull; Prayer &bull; Brotherhood
        </p>
      </div>
    </section>
  );
}
