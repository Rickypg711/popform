import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/script";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      include: {
        reservedNumbers: true,
      },
    });

    const usersWithNumbers = users.map((user) => ({
      ...user,
      numbers: user.reservedNumbers.map((reservedNumber) => reservedNumber.number),
    }));

    return NextResponse.json(usersWithNumbers);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
