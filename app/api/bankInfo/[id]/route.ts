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
