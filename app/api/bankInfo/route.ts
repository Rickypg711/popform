import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/app/lib/script";

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
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    const bankInfos = await prisma.bankInfo.findMany();
    console.log("bankinfos:", bankInfos);

    await prisma.$disconnect();

    return new NextResponse(JSON.stringify(bankInfos), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const data: BankInfo = await request.json();

  try {
    const bankInfo = await prisma.bankInfo.create({ data });
    console.log("Created bankInfo:", bankInfo);

    await prisma.$disconnect();

    return new NextResponse(JSON.stringify({ message: 'Bank account information submitted successfully.' }));
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
