"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Reservation } from "../types/reservation";

const useReservations = (tenantId: string, propertyId: string) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("tenant_id", tenantId)
        .eq("property_id", propertyId);

      if (error) {
        setError(error.message);
      } else {
        setReservations(data);
      }
      setLoading(false);
    };

    fetchReservations();
  }, [tenantId, propertyId]);

  return { reservations, loading, error };
};

export default useReservations;
