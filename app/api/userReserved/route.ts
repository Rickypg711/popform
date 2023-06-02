import { prisma } from "@/app/lib/script";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, email } = await request.json();

  if (!id || !email) {
    return NextResponse.json({ error: "Missing id or email" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          email: true, // Add this line
          reservedNumbers: {
            select: {
              number: true,
            },
          },
        },
      });
      
    if (!user || user.email !== email) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const reservedNumbers = user.reservedNumbers.map((num) => num.number);

    return NextResponse.json(reservedNumbers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
