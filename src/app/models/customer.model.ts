export interface RentedCar {
  id: string;
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  regNo: string;
  pricePerDay: number;
  gearType: string;
  fuelType: string;
  mileage: string;
  seatCount: string;
  images: any[]; // Define specific properties if available
  status: string;
}

export interface Address {
  houseNo: string;
  street1: string;
  street2?: string | null;
  city: string;
  zipCode: number;
  country: string;
}

export interface PhoneNumber {
  mobile1: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  image?: string | null;
  email: string;
  licence?: string | null;
  nic: string;
  addresses: Address[];
  phoneNumbers: PhoneNumber[];
  notes?: string;
  status: string;
  password?: string;
}

export interface CustomerResponse {
  customer: Customer;
  rentedCars: RentedCar[] | null;
  message: string;
}
