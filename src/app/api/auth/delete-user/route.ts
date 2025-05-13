import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  
  try {
    // Find user by email
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    console.log("Found user:", user.id);
    
    // Delete user from database first
    await supabase.from('user').delete().eq('id', user.id);
    
    // Then delete auth user
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}