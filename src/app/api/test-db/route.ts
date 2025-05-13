import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Try to count users
    const userCount = await prisma.user.count();
    
    return NextResponse.json({ 
      message: "Database connection working", 
      userCount 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Database connection failed", error: String(error) },
      { status: 500 }
    );
  }
}