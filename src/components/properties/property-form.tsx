"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProperty } from "../../lib/api"; // Assume this function handles API calls

const propertySchema = z.object({
  name: z.string().min(1, "Property name is required"),
  location: z.string().min(1, "Location is required"),
  guestCapacity: z.number().min(1, "Guest capacity must be at least 1"),
  amenities: z.string().optional(),
});

type PropertyFormInputs = z.infer<typeof propertySchema>;

const PropertyForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormInputs>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: PropertyFormInputs) => {
    try {
      await createProperty(data);
      onSuccess();
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">
          Property Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`input ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block">
          Location
        </label>
        <input
          id="location"
          type="text"
          {...register("location")}
          className={`input ${errors.location ? "border-red-500" : ""}`}
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="guestCapacity" className="block">
          Guest Capacity
        </label>
        <input
          id="guestCapacity"
          type="number"
          {...register("guestCapacity", { valueAsNumber: true })}
          className={`input ${errors.guestCapacity ? "border-red-500" : ""}`}
        />
        {errors.guestCapacity && (
          <p className="text-red-500">{errors.guestCapacity.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amenities" className="block">
          Amenities
        </label>
        <textarea id="amenities" {...register("amenities")} className="input" />
      </div>

      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;
