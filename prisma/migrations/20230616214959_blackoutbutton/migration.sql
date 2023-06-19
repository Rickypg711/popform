-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "blackOut" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);
