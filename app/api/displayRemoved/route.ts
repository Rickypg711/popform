import { NextResponse } from "next/server";
import {prisma} from "@/app/lib/script";

type ConfigData = {
  blackOut: boolean;
};


export async function GET(request: Request) {
  try {
    const config = await prisma.config.findFirst();

    if (config) {
      return NextResponse.json({ blackOut: config.blackOut });
    } else {
      return NextResponse.json({ blackOut: false });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  const data: ConfigData = await request.json();
  const { blackOut } = data;
  console.log('Received blackOut value:', blackOut);
  try {
    await prisma.config.upsert({
      where: { id: 1 }, // Still assuming the first and only config has an id of 1
      update: { blackOut: blackOut },
      create: { blackOut: blackOut },
    });

    return NextResponse.json({ blackOut });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
