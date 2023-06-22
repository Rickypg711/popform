import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/app/lib/script";

export async function DELETE(request: NextRequest) {
  if (request.method !== 'DELETE') {
    return new NextResponse({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const url = new URL(request.nextUrl);
  const bankId = url.pathname.split('/').pop();

  console.log("url", url); // for debugging
  console.log("bankId", bankId); // for debugging

  if (!Number.isInteger(Number(bankId))) {
    return new NextResponse({ error: 'Bad Request' }, { status: 400 });
  }

  try {
    await prisma.bankInfo.delete({
      where: {
        id: Number(bankId),
      },
    });

    return new NextResponse({ message: 'Bank account information deleted successfully.' });
  } catch (error) {
    console.error('Delete operation failed with error:', error);
    return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (request.method !== 'PUT') {
    return new NextResponse({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const url = new URL(request.nextUrl);
  const bankId = url.pathname.split('/').pop();

  console.log("url", url); // for debugging
  console.log("bankId", bankId); // for debugging

  if (!Number.isInteger(Number(bankId))) {
    return new NextResponse({ error: 'Bad Request' }, { status: 400 });
  }

  // Assuming that the request body contains the updated bank info
  const updatedBankInfo = await request.json();

  try {
    await prisma.bankInfo.update({
      where: {
        id: Number(bankId),
      },
      data: updatedBankInfo,
    });

    return new NextResponse({ message: 'Bank account information updated successfully.' });
  } catch (error) {
    console.error('Update operation failed with error:', error);
    return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}
