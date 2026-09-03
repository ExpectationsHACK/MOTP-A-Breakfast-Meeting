"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const RegistrationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, { message: "Phone number must be exactly 11 digits." }),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email.")]),
  homeChurch: z.string().trim().max(120).optional(),
  prayerFocus: z.string().trim().max(600).optional(),
});

export type RegistrationState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof RegistrationSchema>, string>>;
};

export async function registerAttendee(
  _prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    homeChurch: String(formData.get("homeChurch") ?? ""),
    prayerFocus: String(formData.get("prayerFocus") ?? ""),
  };

  const parsed = RegistrationSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: RegistrationState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const { fullName, phone, email, homeChurch, prayerFocus } = parsed.data;

  await prisma.registrant.create({
    data: {
      fullName,
      phone,
      email: email || null,
      homeChurch: homeChurch || null,
      prayerFocus: prayerFocus || null,
    },
  });

  return {
    status: "success",
    message: "You're registered! We'll see you at the table on September 19.",
  };
}
