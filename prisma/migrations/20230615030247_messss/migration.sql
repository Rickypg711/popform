/*
  Warnings:

  - You are about to alter the column `content` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "content" SET DATA TYPE VARCHAR(2000);
