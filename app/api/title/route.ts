import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/script"; // ensure this import is correct

export async function GET() {
  try {
    const lastTitle = await prisma.title.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
    if (lastTitle) {
      return NextResponse.json({ title: lastTitle.title });
    } else {
      return NextResponse.json({ message: 'No titles found.' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTitle = data.title;
    await prisma.title.create({
      data: {
        title: newTitle,
      },
    });
    return NextResponse.json({ message: 'Title updated successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
