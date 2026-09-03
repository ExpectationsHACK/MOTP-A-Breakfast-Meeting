import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { RegistrantStatus } from "@prisma/client";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isSuper = session.user.role === "SUPER_ADMIN";
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const status = searchParams.get("status");
  const admin = searchParams.get("admin");

  const where: Record<string, unknown> = {};

  if (!isSuper) {
    where.assignedAdminId = session.user.id;
  } else if (admin === "unassigned") {
    where.assignedAdminId = null;
  } else if (admin) {
    where.assignedAdminId = admin;
  }

  if (status) where.status = status as RegistrantStatus;
  if (q) {
    where.OR = [
      { fullName: { contains: q } },
      { phone: { contains: q } },
      { email: { contains: q } },
    ];
  }

  const registrants = await prisma.registrant.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { assignedAdmin: { select: { name: true } } },
  });

  const headers = [
    "Full Name",
    "Phone",
    "Email",
    "Home Church",
    "Prayer Focus",
    "Status",
    "Assigned Admin",
    "Registered At",
  ];

  const rows = registrants.map((r) =>
    [
      r.fullName,
      r.phone,
      r.email ?? "",
      r.homeChurch ?? "",
      r.prayerFocus ?? "",
      r.status,
      r.assignedAdmin?.name ?? "",
      r.createdAt.toISOString(),
    ]
      .map((v) => csvEscape(String(v)))
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="motp-registrants-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
