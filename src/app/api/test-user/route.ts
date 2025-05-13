import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Just test if we can read from the database
    const userCount = await prisma.user.count();
    
    // Try writing a test record to another table (not User)
    const testRecord = await prisma.profile.create({
      data: {
        full_name: "Test Profile",
        email: "test-profile@example.com"
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      userCount,
      testRecordId: testRecord.id
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}