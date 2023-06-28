// script/rifaYbono.ts

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/script";

interface ConfigData {
  rifa: string;
  bono: string;
}

export async function POST(request: Request) {
  const data: ConfigData = await request.json();
  const { rifa, bono } = data;
  console.log("Received rifa and bono values:", rifa, bono);

  try {
    await prisma.config.upsert({
      where: { id: 1 },
      update: { rifa: rifa, bono: bono },
      create: { rifa: rifa, bono: bono },
    });

    return NextResponse.json({ rifa, bono });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// gets the rifa and bono
export async function GET() {
  try {
    const config = await prisma.config.findUnique({
      where: { id: 1 },
    });

    if (config && config.rifa && config.bono) {
      return NextResponse.json({ rifa: config.rifa, bono: config.bono });
    } else {
      return NextResponse.json(
        { error: "Rifa and/or Bono not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
