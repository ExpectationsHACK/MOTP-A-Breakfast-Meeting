-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "RegistrantStatus" AS ENUM ('NEW', 'CONTACTED', 'CONFIRMED', 'ATTENDED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registrant" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "homeChurch" TEXT,
    "prayerFocus" TEXT,
    "status" "RegistrantStatus" NOT NULL DEFAULT 'NEW',
    "contactedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedAdminId" TEXT,
    "promotedUserId" TEXT,

    CONSTRAINT "Registrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpNote" (
    "id" TEXT NOT NULL,
    "registrantId" TEXT NOT NULL,
    "authorId" TEXT,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowUpNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Registrant_promotedUserId_key" ON "Registrant"("promotedUserId");

-- CreateIndex
CREATE INDEX "Registrant_assignedAdminId_idx" ON "Registrant"("assignedAdminId");

-- CreateIndex
CREATE INDEX "Registrant_status_idx" ON "Registrant"("status");

-- CreateIndex
CREATE INDEX "FollowUpNote_registrantId_idx" ON "FollowUpNote"("registrantId");

-- AddForeignKey
ALTER TABLE "Registrant" ADD CONSTRAINT "Registrant_assignedAdminId_fkey" FOREIGN KEY ("assignedAdminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrant" ADD CONSTRAINT "Registrant_promotedUserId_fkey" FOREIGN KEY ("promotedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpNote" ADD CONSTRAINT "FollowUpNote_registrantId_fkey" FOREIGN KEY ("registrantId") REFERENCES "Registrant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUpNote" ADD CONSTRAINT "FollowUpNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
