// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// type Feedback = {
//   name: string;
//   email: string;
//   numbers: number[];
// };

// export async function POST(request: Request) {
//   const data: Feedback = await request.json();
//   const { name, email, numbers } = data;

//   try {
//     // Create a new user in the database with the provided name, email, and reserved numbers
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         numbers: {
//           set: numbers, // Assuming numbers is an array of integers
//         },
//         reservedNumbers: {
//           create: numbers?.map((number) => ({ number })),
//         },
//       },
//     });

//     console.log("user", user);

//     return NextResponse.json({ name, email, numbers });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json("message: no mames");
//   } finally {
//     await prisma.$disconnect();
//   }
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Feedback = {
  name: string;
  email: string;
  numbers: number[];
};

export async function GET(request: Request) {
    try {
      const reservedNumbers = await prisma.reservedNumber.findMany();
      const reserved = reservedNumbers.map((number) => number.number);
  
      const availableNumbers = Array.from({ length: 600 })
        .map((_, index) => index)
        .filter((index) => !reserved.includes(index));
  
      return NextResponse.json(availableNumbers);
    } catch (error) {
      console.error(error);
  
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }

export async function POST(request: Request) {
  const data: Feedback = await request.json();
  const { name, email, numbers } = data;

  try {
    const reservedNumbers = await prisma.reservedNumber.findMany();
    const existingNumbers = reservedNumbers.map((reservedNumber) => reservedNumber.number);
    const availableNumbers = numbers.filter((number) => !existingNumbers.includes(number));

    if (availableNumbers.length === 0) {
      return NextResponse.json({ error: "All numbers are already reserved" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        numbers: {
          set: availableNumbers,
        },
        reservedNumbers: {
          create: availableNumbers.map((number) => ({ number })),
        },
      },
    });

    console.log("user", user);

    return NextResponse.json({ name, email, numbers: availableNumbers });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
