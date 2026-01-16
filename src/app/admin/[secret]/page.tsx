import { Card } from "@/components/ui/card";
import { FolderOpen, MessageSquare, CreditCard, Globe } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: testimonialCount } = await supabase
    .from("testimonials")
    .select("*", { count: "exact", head: true });

  const { count: pricingCount } = await supabase
    .from("pricing_plans")
    .select("*", { count: "exact", head: true });

  const { count: serviceCount } = await supabase
    .from("service_features")
    .select("*", { count: "exact", head: true });

  const stats = [
    {
      label: "Total Projects",
      value: projectCount || 0,
      icon: FolderOpen,
      href: `/admin/${secret}/projects`,
      color: "text-blue-500",
    },
    {
      label: "Testimonials",
      value: testimonialCount || 0,
      icon: MessageSquare,
      href: `/admin/${secret}/testimonials`,
      color: "text-green-500",
    },
    {
      label: "Pricing Plans",
      value: pricingCount || 0,
      icon: CreditCard,
      href: `/admin/${secret}/pricing`,
      color: "text-purple-500",
    },
    {
      label: "Services",
      value: serviceCount || 0,
      icon: Globe,
      href: `/admin/${secret}/services`,
      color: "text-orange-500",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white border-0 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {stat.label}
                    </p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-xl font-semibold mb-2 text-(--color-navy)">
          Selamat datang di CMS Dashboard!
        </h3>
        <p className="text-gray-600">
          Gunakan menu di sebelah kiri untuk mengelola konten website Anda.
          Semua perubahan akan langsung tampil di website utama.
        </p>
      </div>
    </div>
  );
}
