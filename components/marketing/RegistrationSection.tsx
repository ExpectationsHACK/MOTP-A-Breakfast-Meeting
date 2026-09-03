import RegistrationForm from "./RegistrationForm";

export default function RegistrationSection() {
  return (
    <section id="register" className="container-page py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">Your Seat Is Waiting</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            You have spent enough time carrying everyone else.
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            Give God the opportunity to strengthen you. Come expecting. Come hungry. Come ready to
            pray. Don&rsquo;t come alone either. Think of one man who needs encouragement,
            direction, or a fresh encounter with God, and invite him.
          </p>
        </div>

        <div className="rounded-3xl border border-line-strong bg-bg-raised p-6 sm:p-8 shadow-xl shadow-black/5">
          <h3 className="font-display text-xl font-bold mb-6">Register for the Breakfast Meeting</h3>
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
