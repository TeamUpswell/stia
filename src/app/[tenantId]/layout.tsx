"use client";

import React from "react";
import { TenantProvider } from "../../contexts/tenant-context";
import Navbar from "../../components/layout/navbar";
import Sidebar from "../../components/layout/sidebar";
import { useParams } from "next/navigation";

// Add type for children prop
const Layout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const tenantId = params.tenantId as string;

  return (
    <TenantProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </TenantProvider>
  );
};

export default Layout;
