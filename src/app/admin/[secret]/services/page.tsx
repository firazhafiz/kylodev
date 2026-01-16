import { supabase } from "@/lib/supabase";
import ServicesClient from "@/components/admin/ServicesClient";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  const { data } = await supabase
    .from("service_features")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  return <ServicesClient initialData={data || []} secret={secret} />;
}
