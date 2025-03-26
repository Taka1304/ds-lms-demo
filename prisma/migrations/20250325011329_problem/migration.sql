/*
  Warnings:

  - You are about to drop the `_CourseToProblem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CourseToProblem" DROP CONSTRAINT "_CourseToProblem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToProblem" DROP CONSTRAINT "_CourseToProblem_B_fkey";

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CourseToProblem";

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
