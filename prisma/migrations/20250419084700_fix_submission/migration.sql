/*
  Warnings:

  - You are about to drop the column `errorMessage` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `executionTime` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `memoryUsage` on the `Submission` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NOT_SUBMITTED', 'PENDING', 'EVALUATED');

-- DropIndex
DROP INDEX "Submission_problemId_status_executionTime_idx";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "errorMessage",
DROP COLUMN "executionTime",
DROP COLUMN "memoryUsage",
ADD COLUMN     "startedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "memoryUsage" INTEGER,
ADD COLUMN     "timeUsage" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "Submission_problemId_status_idx" ON "Submission"("problemId", "status");
