"use client";
import React from "react";
import VendorLayout from "./_components/VendorLayout";
import { usePathname } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // Skip layout for /vendor/setup
  if (pathname === "/vendor/setup") {
    return <>{children}</>;
  }
  return <VendorLayout>{children}</VendorLayout>;
};

export default layout;
