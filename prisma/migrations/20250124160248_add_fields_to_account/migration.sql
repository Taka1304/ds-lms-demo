-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "id_token_expires_in" INTEGER,
ADD COLUMN     "not_before" INTEGER,
ADD COLUMN     "profile_info" TEXT;
