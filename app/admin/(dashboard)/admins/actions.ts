"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const CreateAdminSchema = z.object({
  name: z.string().trim().min(2, "Enter a name."),
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["ADMIN", "SUPER_ADMIN"]),
});

export type CreateAdminState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof CreateAdminSchema>, string>>;
};

export async function createAdmin(
  _prevState: CreateAdminState,
  formData: FormData
): Promise<CreateAdminState> {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") {
    return { status: "error", message: "Only a super admin can add admins." };
  }

  const parsed = CreateAdminSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role") ?? "ADMIN",
  });

  if (!parsed.success) {
    const fieldErrors: CreateAdminState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const { name, email, password, role } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return { status: "error", message: "An admin with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email: normalizedEmail, passwordHash, role } });

  revalidatePath("/admin/admins");
  return { status: "success", message: `${name} was added as ${role === "SUPER_ADMIN" ? "a super admin" : "an admin"}.` };
}

export async function removeAdmin(userId: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN") throw new Error("Only a super admin can do this.");
  if (session.user.id === userId) throw new Error("You can't remove your own account.");

  await prisma.registrant.updateMany({ where: { assignedAdminId: userId }, data: { assignedAdminId: null } });
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/admins");
  revalidatePath("/admin/registrants");
}
