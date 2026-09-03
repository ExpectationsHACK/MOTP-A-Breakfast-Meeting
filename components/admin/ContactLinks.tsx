import { Phone, MessageSquare } from "lucide-react";

export default function ContactLinks({ phone }: { phone: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <a
        href={`tel:${phone}`}
        title={`Call ${phone}`}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line-strong text-ink-muted hover:text-ember hover:border-ember/50"
      >
        <Phone size={13} />
      </a>
      <a
        href={`sms:${phone}`}
        title={`Text ${phone}`}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line-strong text-ink-muted hover:text-ember hover:border-ember/50"
      >
        <MessageSquare size={13} />
      </a>
    </div>
  );
}
