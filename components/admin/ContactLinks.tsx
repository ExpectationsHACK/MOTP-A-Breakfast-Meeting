import { MessageSquare } from "lucide-react";
import { toWhatsAppLink } from "@/lib/phone";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function ContactLinks({ phone }: { phone: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <a
        href={toWhatsAppLink(phone)}
        target="_blank"
        rel="noopener noreferrer"
        title={`Call ${phone} on WhatsApp`}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line-strong text-ink-muted hover:text-[#25D366] hover:border-[#25D366]/50"
      >
        <WhatsAppIcon />
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
