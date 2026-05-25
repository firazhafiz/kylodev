import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  projects,
  pricingPlans,
  serviceFeatures,
  testimonials,
} from "@/constant";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const errors = [];

  try {
    // 1. Seed Projects
    for (const project of projects) {
      const { id, frameworks, ...projectData } = project;
      const { error } = await supabase.from("projects").upsert({
        id,
        ...projectData,
      });
      if (error) {
        console.error("Error seeding project:", project.name, error);
        errors.push({ type: "project", name: project.name, error });
      }
    }

    // 2. Seed Pricing Plans
    // Hapus semua data pricing_plans lama (Clean up)
    const { error: deleteError } = await supabase
      .from("pricing_plans")
      .delete()
      .neq("id", -1); // Menghapus semua row (selalu benar karena id >= 0)

    if (deleteError) {
      errors.push({ type: "pricing_delete", error: deleteError });
    } else {
      // Masukkan data baru
      for (const plan of pricingPlans) {
        const iconName = plan.icon_name || "Star";
        const { icon, ...planData } = plan;

        const { error } = await supabase.from("pricing_plans").insert({
          ...planData,
          icon_name: iconName,
        });
        if (error) errors.push({ type: "pricing", name: plan.name, error });
      }
    }

    // 3. Seed Service Features
    const { error: serviceDeleteError } = await supabase
      .from("service_features")
      .delete()
      .neq("id", -1); // Clean up all rows

    if (serviceDeleteError) {
      errors.push({ type: "service_delete", error: serviceDeleteError });
    } else {
      for (const feature of serviceFeatures) {
        const iconName = feature.icon_name || "Globe";
        const { icon, ...featureData } = feature;

        const { error } = await supabase.from("service_features").insert({
          ...featureData,
          icon_name: iconName,
        });
        if (error) errors.push({ type: "service", name: feature.title, error });
      }
    }

    // 4. Seed Testimonials
    const { count: testiCount, error: testiCheckError } = await supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true });

    if (testiCheckError)
      errors.push({ type: "testi_check", error: testiCheckError });

    if (!testiCheckError && testiCount === 0) {
      const { error } = await supabase
        .from("testimonials")
        .insert(testimonials);
      if (error) errors.push({ type: "testi_insert", error });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          message: "Seeding finished with errors",
          errors,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Seeding completed successfully" });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
