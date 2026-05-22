import { supabase } from "@/lib/supabase";
import Pricing from "@/components/section/Pricing";
import BreadCrumb from "@/components/moleculs/BreadCrumb";
import PricingPageTracker from "@/components/moleculs/PricingPageTracker";
import PricingPageExtras from "@/components/section/PricingPageExtras";

export const revalidate = 0;

export default async function PricingPage() {
  const { data: plans } = await supabase
    .from("pricing_plans")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <>
      <PricingPageTracker />
      <BreadCrumb route="Pricing" />
      <Pricing plans={plans || []} />
      <PricingPageExtras />
    </>
  );
}
