export interface Reservation {
  id: string;
  tenantId: string;
  propertyId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReservationInput {
  tenantId: string;
  propertyId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

export interface UpdateReservationInput {
  id: string;
  status?: 'pending' | 'confirmed' | 'canceled';
  startDate?: Date;
  endDate?: Date;
}