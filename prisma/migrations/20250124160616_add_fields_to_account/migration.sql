/*
  Warnings:

  - You are about to drop the column `id_token_expires_in` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "id_token_expires_in",
ADD COLUMN     "refresh_token_expires_in" INTEGER;
