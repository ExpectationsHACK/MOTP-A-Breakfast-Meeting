export default function SectionHeading({
  eyebrow,
  title,
  lede,
  center,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight text-ink">
        {title}
      </h2>
      {lede && <p className="mt-4 text-ink-muted leading-relaxed">{lede}</p>}
    </div>
  );
}
