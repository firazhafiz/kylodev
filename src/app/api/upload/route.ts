import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // Initialize Supabase Admin Client (Service Role) inside handler to avoid build-time errors
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing Supabase configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // 1. Verify Admin Secret
    const authHeader = request.headers.get("x-admin-secret");
    if (authHeader !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Define Bucket and File Path
    const bucketName = "uploads";
    // Ensure unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    // 4. Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // 5. Get Public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
