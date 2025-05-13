"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Tenant {
  id: string;
  name: string;
  // Add other tenant-specific fields as needed
}

interface TenantContextType {
  tenants: Tenant[];
  addTenant: (tenant: Tenant) => void;
  removeTenant: (tenantId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  const addTenant = (tenant: Tenant) => {
    setTenants((prevTenants) => [...prevTenants, tenant]);
  };

  const removeTenant = (tenantId: string) => {
    setTenants((prevTenants) =>
      prevTenants.filter((tenant) => tenant.id !== tenantId)
    );
  };

  return (
    <TenantContext.Provider value={{ tenants, addTenant, removeTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
