import { supabase } from "@/lib/supabase";
import PricingClient from "@/components/admin/PricingClient";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  const { data } = await supabase
    .from("pricing_plans")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  return <PricingClient initialData={data || []} secret={secret} />;
}
