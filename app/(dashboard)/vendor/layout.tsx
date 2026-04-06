import React from "react";
import VendorLayout from "./_components/VendorLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <VendorLayout>{children}</VendorLayout>;
};

export default layout;
