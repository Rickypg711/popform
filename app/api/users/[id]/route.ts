import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/script';

export async function DELETE(request: NextRequest) {
  if (request.method !== 'DELETE') {
    return new NextResponse({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const url = new URL(request.nextUrl);
  const userId = url.pathname.split('/').pop();

  console.log('url', url); // for debugging
  console.log('userId', userId); // for debugging

  if (!Number.isInteger(Number(userId))) {
    return new NextResponse({ error: 'Bad Request' }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return new NextResponse({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Delete operation failed with error:', error);
    return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
