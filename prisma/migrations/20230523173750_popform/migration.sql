-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numbers" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservedNumber" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ReservedNumber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReservedNumber" ADD CONSTRAINT "ReservedNumber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
