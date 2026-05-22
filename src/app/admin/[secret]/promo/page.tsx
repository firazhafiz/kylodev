import { supabase } from "@/lib/supabase";
import PromoAdminClient from "@/components/admin/PromoAdminClient";

export default async function PromoAdminPage() {
  const { data: banner } = await supabase
    .from('promo_banner')
    .select('*')
    .single();
    
  const { data: plans } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Promo Banner Management</h1>
      <PromoAdminClient initialBanner={banner} initialPlans={plans || []} />
    </div>
  );
}
