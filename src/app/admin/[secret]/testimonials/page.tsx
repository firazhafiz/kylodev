import { supabase } from "@/lib/supabase";
import TestimonialsClient from "@/components/admin/TestimonialsClient";

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return <TestimonialsClient initialData={data || []} secret={secret} />;
}
