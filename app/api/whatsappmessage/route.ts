import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/script";

type MessageData = {
  message: string;
};

export async function GET(request: Request) {
    try {
      const messageData = await prisma.message.findFirst();
  
      // If no message is found in the database, return an empty string
      if (!messageData) {
        return NextResponse.json({ message: '' });
      }
  
      return NextResponse.json({ message: messageData.content || '' });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  

  export async function POST(request: Request) {
    const data: MessageData = await request.json();
    const { message } = data;
  
    try {
      await prisma.message.upsert({
        where: { id: 1 }, // Still assuming the first and only message has an id of 1
        update: { content: message },
        create: { content: message },
      });
  
      return NextResponse.json({ message });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
