import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    let query = supabase.from("site_settings").select("*");

    if (key) {
      query = query.eq("key", key);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform to simple key-value object if easier for frontend,
    // but array of objects is fine too.
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("x-admin-secret");
    if (authHeader !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json(); // Expected { key: "contact", value: {...} }

    // Upsert
    const { data, error } = await supabase
      .from("site_settings")
      .upsert(body)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
