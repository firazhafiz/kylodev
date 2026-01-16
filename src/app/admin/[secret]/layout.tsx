import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  if (secret !== process.env.ADMIN_SECRET_KEY) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <AdminSidebar secret={secret} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-16 md:pt-8 w-full max-w-full overflow-x-hidden">
        <Toaster />
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
