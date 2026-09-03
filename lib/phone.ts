/**
 * Registrant phone numbers are stored as 11-digit Nigerian local numbers
 * (e.g. "08012345678"). WhatsApp links need the international form with no
 * leading zero (e.g. "2348012345678").
 */
export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  return digits;
}

export function toWhatsAppLink(phone: string): string {
  return `https://wa.me/${toWhatsAppNumber(phone)}`;
}
