export enum CustomerStatus {
  Active = 'فعال',
  Inactive = 'غیرفعال',
  New = 'جدید',
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  taxCode: string;
  businessLicenseUrl?: string;
  status: CustomerStatus;
  lastContact: string;
  joinDate: string; // YYYY-MM-DD
  purchaseCount: number;
}
