"use client";
import BreadCrumb from "@/components/moleculs/BreadCrumb";
import React from "react";

import { usePathname } from "next/navigation";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const pathname =
    path.split("/")[1].charAt(0).toUpperCase() +
    path.split("/")[1].slice(1).toLowerCase();
  return (
    <>
      <BreadCrumb route={pathname} />
      {children}
    </>
  );
}
