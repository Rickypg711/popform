-- CreateTable
CREATE TABLE "BankInfo" (
    "id" SERIAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "cardNumber" TEXT,
    "routingNumber" TEXT,
    "accountName" TEXT,

    CONSTRAINT "BankInfo_pkey" PRIMARY KEY ("id")
);
