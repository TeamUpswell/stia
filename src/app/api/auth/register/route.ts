import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

export async function POST(request: Request) {
  try {
    console.log("Registration API called");
    
    const body = await request.json();
    console.log("Registration data:", body);
    const { name, email, password } = body;
    
    // First check if auth user exists and delete if needed (for development)
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      console.log("User exists, deleting first:", existingUser.id);
      // Delete from database first
      await supabase.from('user').delete().eq('id', existingUser.id);
      // Then delete auth user
      await supabase.auth.admin.deleteUser(existingUser.id);
    }
    
    // Add before your insert
    const { data: dbTables } = await supabase.rpc('get_tables');
    console.log("Available tables:", dbTables);

    // Or check with this SQL query
    const { data: tables } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    console.log("Tables in public schema:", tables);

    // Create new auth user
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    
    if (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json({ message: authError.message }, { status: 500 });
    }
    
    // Now try to add user to database table with more error details
    try {
      const { data: userData, error: userError } = await supabase
        .from('user') // Lowercase table name - THIS IS CASE SENSITIVE
        .insert([
          { 
            id: authUser.user.id,
            name,
            email,
            role: "user",
            // Add other required fields based on your schema
          }
        ])
        .select(); // Add this to see the returned record
      
      if (userError) {
        console.error("User data error:", userError);
        return NextResponse.json({ message: "User created but profile failed", error: userError }, { status: 500 });
      }
      
      return NextResponse.json({ message: "User registered successfully" });
    } catch (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ message: "Auth success but database error", error: String(insertError) }, { status: 500 });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Registration failed", error: String(error) }, { status: 500 });
  }
}