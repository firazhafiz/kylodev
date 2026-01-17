"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  CreditCard,
  Settings,
  Globe,
  Home,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSidebar({ secret }: { secret: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: `/admin/${secret}`,
    },
    {
      label: "Projects",
      icon: FolderOpen,
      href: `/admin/${secret}/projects`,
    },
    {
      label: "Testimonials",
      icon: MessageSquare,
      href: `/admin/${secret}/testimonials`,
    },
    {
      label: "Pricing Plans",
      icon: CreditCard,
      href: `/admin/${secret}/pricing`,
    },
    {
      label: "Service Features",
      icon: Globe,
      href: `/admin/${secret}/services`,
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/admin/${secret}/settings`,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-black-100/50 text-white rounded-md md:hidden hover:bg-black-100 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-black-100 text-white flex flex-col z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-(--color-lime)">KyloDev</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive
                      ? "text-lime-primary"
                      : "group-hover:text-lime-primary",
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>View Site</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
