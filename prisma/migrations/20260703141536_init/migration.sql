/*
  Warnings:

  - You are about to alter the column `value` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `value` on the `treatments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the column `stripeEventId` on the `webhook_events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `webhook_events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `webhook_events` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "webhook_events_stripeEventId_key";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "treatments" ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "webhook_events" DROP COLUMN "stripeEventId",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blacklisted_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blacklisted_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "blacklisted_tokens_token_key" ON "blacklisted_tokens"("token");

-- CreateIndex
CREATE INDEX "appointments_patientId_idx" ON "appointments"("patientId");

-- CreateIndex
CREATE INDEX "appointments_userId_idx" ON "appointments"("userId");

-- CreateIndex
CREATE INDEX "patients_userId_idx" ON "patients"("userId");

-- CreateIndex
CREATE INDEX "payments_treatmentId_idx" ON "payments"("treatmentId");

-- CreateIndex
CREATE INDEX "sessions_treatmentId_idx" ON "sessions"("treatmentId");

-- CreateIndex
CREATE INDEX "treatments_userId_idx" ON "treatments"("userId");

-- CreateIndex
CREATE INDEX "treatments_patientId_idx" ON "treatments"("patientId");

-- CreateIndex
CREATE INDEX "user_consents_userId_idx" ON "user_consents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_events_eventId_key" ON "webhook_events"("eventId");
