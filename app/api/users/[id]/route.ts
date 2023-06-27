


import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/script';

export async function DELETE(request: NextRequest) {
  if (request.method !== 'DELETE') {
    return new NextResponse(null, { status: 405, statusText: 'Method Not Allowed' });
  }

  const url = new URL(request.nextUrl);
  const userId = url.pathname.split('/').pop();

  if (!Number.isInteger(Number(userId))) {
    return new NextResponse(null, { status: 400, statusText: 'Bad Request' });
  }

  try {
    // Begin a transaction
    const transaction = prisma.$transaction([
      prisma.reservedNumber.deleteMany({
        where: {
          userId: Number(userId),
        },
      }),
      prisma.user.delete({
        where: {
          id: Number(userId),
        },
      }),
    ]);

    await transaction;

    return new NextResponse(JSON.stringify({ message: 'User deleted successfully.' }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Delete operation failed with error:', error);
    return new NextResponse(null, { status: 500, statusText: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}



export async function PATCH(request: NextRequest) {
  if (request.method !== 'PATCH') {
    return new NextResponse(null, { status: 405, statusText: 'Method Not Allowed' });
  }

  const url = new URL(request.nextUrl);
  const userId = url.pathname.split('/').pop();

  if (!Number.isInteger(Number(userId))) {
    return new NextResponse(null, { status: 400, statusText: 'Bad Request' });
  }

  const { paid } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        paid,
      },
    });

    return new NextResponse(JSON.stringify(updatedUser), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Update operation failed with error:', error);
    return new NextResponse(null, { status: 500, statusText: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}