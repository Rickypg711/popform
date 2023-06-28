/*
  Warnings:

  - You are about to drop the `Title` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Config" ADD COLUMN     "fechaDeSorteo" TIMESTAMP(3);

-- DropTable
DROP TABLE "Title";
