"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useReservations } from "@/hooks/use-reservations";
import ReservationCalendar from "@/components/reservations/reservation-calendar";
import ReservationForm from "@/components/reservations/reservation-form";

const ReservationsPage = () => {
  const params = useParams();
  const tenantId = params.tenantId as string;
  const propertyId = params.propertyId as string;

  const { reservations, isLoading, error } = useReservations(
    tenantId,
    propertyId
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reservations.</div>;

  return (
    <div>
      <h1>Reservations for Property {propertyId}</h1>
      <ReservationCalendar reservations={reservations} />
      <ReservationForm propertyId={propertyId} />
    </div>
  );
};

export default ReservationsPage;
