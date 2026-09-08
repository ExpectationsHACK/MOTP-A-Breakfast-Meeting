import RegistrationForm from "./RegistrationForm";

export default function RegistrationSection({
  id = "register",
  eyebrow = "Your Seat Is Waiting",
  heading = "You have spent enough time carrying everyone else.",
  body = "Give God the opportunity to strengthen you. Come expecting. Come hungry. Come ready to pray. Don't come alone either. Think of one man who needs encouragement, direction, or a fresh encounter with God, and invite him.",
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
}) {
  return (
    <section id={id} className="container-page py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            {heading}
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">{body}</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-ember-bright to-[var(--accent-rust)] p-6 sm:p-8 shadow-xl shadow-black/20">
          <h3 className="font-display text-xl font-bold mb-6 text-white">Register for the Breakfast Meeting</h3>
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
