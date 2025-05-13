"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";
import PropertyDetails from "@/components/properties/property-card";

const PropertyPage = () => {
  const params = useParams();
  const tenantId = params.tenantId as string;
  const propertyId = params.propertyId as string;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (tenantId && propertyId) {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", propertyId)
          .eq("tenant_id", tenantId)
          .single();

        if (error) {
          console.error("Error fetching property:", error);
        } else {
          setProperty(data);
        }
        setLoading(false);
      }
    };

    fetchProperty();
  }, [tenantId, propertyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div>
      <h1>{property.name}</h1>
      <PropertyDetails property={property} />
    </div>
  );
};

export default PropertyPage;
