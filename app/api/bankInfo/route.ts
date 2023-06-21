import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/app/lib/script";

// const prisma = new PrismaClient();


type BankInfo = {
  paymentMethod: string;
  bank: string;
  cardNumber: string;
  routingNumber?: string;
  accountName?: string;
  cardHolderName: string;
};

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return new NextResponse({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    // Fetch the bank account information from the database
    const bankInfos = await prisma.bankInfo.findMany();
    console.log("bankinfos:",bankInfos)
    // Disconnect the Prisma client
    await prisma.$disconnect();

    return new NextResponse(JSON.stringify(bankInfos), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}



export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return new NextResponse({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const data: BankInfo = await request.json();

  try {
    // Save the bank account information in the database
    const bankInfo = await prisma.bankInfo.create({ data });

    // Disconnect the Prisma client
    await prisma.$disconnect();

    return new NextResponse({ message: 'Bank account information submitted successfully.' });
  } catch (error) {
    console.error(error);
    return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}
