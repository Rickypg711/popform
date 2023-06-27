import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/script";

interface ConfigData {
  phoneNumber: string;
}

export async function POST(request: Request) {
  const data: ConfigData = await request.json();
  const { phoneNumber } = data;
  console.log("Received phoneNumber value:", phoneNumber);

  try {
    await prisma.config.upsert({
      where: { id: 1 }, // Still assuming the first and only config has an id of 1
      update: { phoneNumber: phoneNumber },
      create: { phoneNumber: phoneNumber },
    });

    return NextResponse.json({ phoneNumber });
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
// gets the phone number
export async function GET() {
  try {
    const config = await prisma.config.findUnique({
      where: { id: 1 }, // Assuming the first and only config has an id of 1
    });

    if (config && config.phoneNumber) {
      return NextResponse.json({ phoneNumber: config.phoneNumber });
    } else {
      return NextResponse.json(
        { error: "Phone number not found" },
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
