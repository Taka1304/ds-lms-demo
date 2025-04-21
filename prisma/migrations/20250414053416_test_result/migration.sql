/*
  Warnings:

  - You are about to drop the column `testResults` on the `Submission` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResultStatus" AS ENUM ('AC', 'WA', 'CE', 'RE', 'TLE');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "testResults",
ADD COLUMN     "evaluatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "testCaseId" TEXT NOT NULL,
    "status" "ResultStatus" NOT NULL,
    "actualOutput" TEXT,
    "errorLog" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestResult_submissionId_testCaseId_key" ON "TestResult"("submissionId", "testCaseId");

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
