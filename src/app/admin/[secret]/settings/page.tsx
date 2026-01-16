import { supabase } from "@/lib/supabase";
import SettingsClient from "@/components/admin/SettingsClient";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", "contact")
    .single();

  return (
    <SettingsClient initialContact={data?.value || null} secret={secret} />
  );
}
