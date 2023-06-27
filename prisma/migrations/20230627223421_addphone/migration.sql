-- AlterTable
ALTER TABLE "Config" ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" DROP DEFAULT;
