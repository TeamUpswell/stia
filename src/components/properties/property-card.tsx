"use client";

import React from "react";
import { Property } from "../../types/property";

interface PropertyCardProps {
  property: Property;
  onSelect: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  return (
    <div
      className="border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelect(property.id)}
    >
      <img
        src={property.imageUrl}
        alt={property.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{property.name}</h2>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-gray-800 mt-1">Capacity: {property.guestCapacity}</p>
      <p className="text-gray-500 mt-1">{property.amenities.join(", ")}</p>
    </div>
  );
};

export default PropertyCard;
