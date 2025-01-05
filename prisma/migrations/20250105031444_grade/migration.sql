-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('B1', 'B2', 'B3', 'B4', 'M1', 'M2', 'D1', 'D2', 'D3');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "grade" "Grade",
ALTER COLUMN "role" DROP NOT NULL;
