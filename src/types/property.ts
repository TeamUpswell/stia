export interface Property {
  id: string;
  tenantId: string;
  name: string;
  location: string;
  description: string;
  amenities: string[];
  guestCapacity: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyFormValues {
  name: string;
  location: string;
  description: string;
  amenities: string[];
  guestCapacity: number;
  images: File[];
}