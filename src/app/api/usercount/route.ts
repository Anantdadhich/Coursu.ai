
import {prisma}from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req:Request,res:Response)
{
    try {
const usercount=await prisma.user.count()
return NextResponse.json({usercount})
    } catch (error) {
        console.log("[user count error ]", error);
    return new NextResponse("internal server error", { status: 500 });  
    }
}
