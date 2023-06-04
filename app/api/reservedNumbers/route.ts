import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/script";

type Feedback = {
  name: string;
  email: string;
  phone: string;  // add this line
  numbers: number[];
};

export async function GET(request: Request) {
  try {
    const reservedNumbers = await prisma.reservedNumber.findMany();
    const reserved = reservedNumbers.map((number) => number.number);

    return NextResponse.json(reserved);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  const data: Feedback = await request.json();
  const { name, email, phone, numbers } = data;  // update this line

  try {
    const reservedNumbers = await prisma.reservedNumber.findMany();
    const existingNumbers = reservedNumbers.map((reservedNumber) => reservedNumber.number);

    // Check if the requested numbers to be reserved are already in the database
    const alreadyReserved = numbers.filter((number) => existingNumbers.includes(number));
    if (alreadyReserved.length > 0) {
      return NextResponse.json({ error: `The numbers ${alreadyReserved.join(', ')} are already reserved.` }, { status: 400 });
    }

    const availableNumbers = numbers.filter((number) => !existingNumbers.includes(number));

    if (availableNumbers.length === 0) {
      return NextResponse.json({ error: "All numbers are already reserved" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,  // add this line
        numbers: {
          set: availableNumbers,
        },
        reservedNumbers: {
          create: availableNumbers.map((number) => ({ number })),
        },
      },
    });

    console.log("user", user);

    return NextResponse.json({ name, email, phone, numbers: availableNumbers });  // update this line
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
