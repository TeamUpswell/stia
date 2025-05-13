export interface Tenant {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  tenantId: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
  };
  theme: string;
}