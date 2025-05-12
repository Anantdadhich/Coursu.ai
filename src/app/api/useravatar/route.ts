import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
 
    const users = await prisma.user.findMany({
      select: {
         image: true
         },
    });


    const avatarUrls = users.map((user) => user.image).filter(Boolean); 

    return NextResponse.json({ avatarUrls });
  } catch (error) {
    console.error("Error fetching avatars:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
