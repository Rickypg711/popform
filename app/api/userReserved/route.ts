import { prisma } from "@/app/lib/script";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { phone, name } = await request.json();

  if (!phone || !name) {
    return NextResponse.json({ error: "Missing phone or name" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            phone: {
            endsWith: phone.slice(-10),
          }
          },
          {
            name: name,
          },
        ],
      },
      include: {
        reservedNumbers: {
          select: {
            number: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const reservedNumbers = user.reservedNumbers.map((num) => num.number);

    return NextResponse.json(reservedNumbers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
