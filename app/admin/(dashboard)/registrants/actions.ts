"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import type { RegistrantStatus } from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated.");
  return session.user;
}

async function requireSuperAdmin() {
  const user = await requireAdmin();
  if (user.role !== "SUPER_ADMIN") throw new Error("Only a super admin can do this.");
  return user;
}

export async function updateStatus(registrantId: string, status: RegistrantStatus) {
  await requireAdmin();
  await prisma.registrant.update({
    where: { id: registrantId },
    data: {
      status,
      contactedAt: status === "NEW" ? null : new Date(),
    },
  });
  revalidatePath("/admin/registrants");
  revalidatePath(`/admin/registrants/${registrantId}`);
}

export async function assignRegistrant(registrantId: string, adminId: string | null) {
  await requireSuperAdmin();
  await prisma.registrant.update({
    where: { id: registrantId },
    data: { assignedAdminId: adminId },
  });
  revalidatePath("/admin/registrants");
  revalidatePath(`/admin/registrants/${registrantId}`);
}

export async function addFollowUpNote(registrantId: string, formData: FormData) {
  const user = await requireAdmin();
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;
  await prisma.followUpNote.create({
    data: { registrantId, authorId: user.id, body },
  });
  revalidatePath(`/admin/registrants/${registrantId}`);
}

export type PromoteState = { status: "idle" | "success" | "error"; message?: string; password?: string };

export async function promoteToAdmin(
  registrantId: string,
  _prevState: PromoteState,
  _formData: FormData
): Promise<PromoteState> {
  try {
    await requireSuperAdmin();

    const registrant = await prisma.registrant.findUnique({ where: { id: registrantId } });
    if (!registrant) return { status: "error", message: "Registrant not found." };
    if (registrant.promotedUserId) return { status: "error", message: "Already an admin." };
    if (!registrant.email) {
      return { status: "error", message: "This registrant needs an email on file before becoming an admin." };
    }

    const existingUser = await prisma.user.findUnique({ where: { email: registrant.email.toLowerCase() } });
    if (existingUser) return { status: "error", message: "An admin with this email already exists." };

    const tempPassword = Math.random().toString(36).slice(-10);
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const user = await prisma.user.create({
      data: {
        name: registrant.fullName,
        email: registrant.email.toLowerCase(),
        passwordHash,
        role: "ADMIN",
      },
    });

    await prisma.registrant.update({
      where: { id: registrantId },
      data: { promotedUserId: user.id },
    });

    revalidatePath("/admin/registrants");
    revalidatePath("/admin/admins");
    revalidatePath(`/admin/registrants/${registrantId}`);

    return {
      status: "success",
      message: `${user.name} is now an admin.`,
      password: tempPassword,
    };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Something went wrong." };
  }
}

export async function deleteRegistrant(registrantId: string) {
  await requireSuperAdmin();
  await prisma.registrant.delete({ where: { id: registrantId } });
  revalidatePath("/admin/registrants");
}
