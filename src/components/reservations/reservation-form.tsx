"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReservation } from "../../hooks/use-reservations";

const reservationSchema = z.object({
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  guestCount: z.number().min(1, "At least one guest is required"),
});

type ReservationFormInputs = z.infer<typeof reservationSchema>;

const ReservationForm: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormInputs) => {
    try {
      await createReservation(propertyId, data);
      // Handle successful reservation (e.g., show a success message or redirect)
    } catch (error) {
      setErrorMessage("Failed to create reservation. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div>
        <label htmlFor="startDate" className="block">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          {...register("startDate")}
          className="input"
        />
        {errors.startDate && (
          <p className="text-red-500">{errors.startDate.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="endDate" className="block">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          {...register("endDate")}
          className="input"
        />
        {errors.endDate && (
          <p className="text-red-500">{errors.endDate.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="guestCount" className="block">
          Guest Count
        </label>
        <input
          type="number"
          id="guestCount"
          {...register("guestCount", { valueAsNumber: true })}
          className="input"
        />
        {errors.guestCount && (
          <p className="text-red-500">{errors.guestCount.message}</p>
        )}
      </div>
      <button type="submit" className="btn">
        Create Reservation
      </button>
    </form>
  );
};

export default ReservationForm;
