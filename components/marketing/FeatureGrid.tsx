import type { ReactNode } from "react";

export type FeatureItem = {
  icon?: ReactNode;
  title: string;
  description: string;
};

const chips = ["chip-amber", "chip-rust", "chip-gold", "chip-brown"];

export default function FeatureGrid({
  items,
  columns = 3,
}: {
  items: FeatureItem[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
      }`}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className="feature-card rounded-2xl border border-line bg-bg-raised p-6 shadow-sm"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          {item.icon && (
            <div
              className={`feature-card-icon mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${chips[i % chips.length]}`}
            >
              {item.icon}
            </div>
          )}
          <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
