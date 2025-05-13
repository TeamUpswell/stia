"use client";

import { useContext } from "react";
import { TenantContext } from "../contexts/tenant-context";

const useTenant = () => {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }

  return context;
};

export default useTenant;
