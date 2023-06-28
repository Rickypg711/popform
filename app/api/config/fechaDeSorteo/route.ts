import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/script";

type ConfigData = {
  fechaDeSorteo: string;
};

export async function GET(request: Request) {
  try {
    const config = await prisma.config.findFirst();

    if (config && config.fechaDeSorteo) {
      return NextResponse.json({ fechaDeSorteo: config.fechaDeSorteo });
    } else {
      return NextResponse.json({ message: "No fecha de sorteo found." }, { status: 404 });
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
  const { fechaDeSorteo } = data;

  // Convert the fechaDeSorteo string to a Date object
  const date = new Date(fechaDeSorteo);
  
  console.log("Received fecha de sorteo value:", date);

  try {
    const existingConfig = await prisma.config.findFirst();
    
    if (existingConfig) {
      await prisma.config.update({
        where: { id: existingConfig.id },
        data: { fechaDeSorteo: date }, // Use the Date object here
      });
    } else {
      await prisma.config.create({
        data: { fechaDeSorteo: date }, // And here
      });
    }

    return NextResponse.json({ message: "Fecha de sorteo updated successfully." });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
