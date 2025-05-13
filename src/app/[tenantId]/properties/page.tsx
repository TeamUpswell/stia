"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useTenant } from "../../../hooks/use-tenant";
import PropertyCard from "../../../components/properties/property-card";

const PropertiesPage = () => {
  const params = useParams();
  const tenantId = params.tenantId as string;
  const { properties, isLoading, error } = useTenant(tenantId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Properties for Tenant: {tenantId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
