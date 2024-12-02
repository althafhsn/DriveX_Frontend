export interface Manager {
    id: string;
    image: string;
    firstName: string;
    lastName: string;
    nic: string;
    role: number;
    email: string;
    addresses: Address[];
    phoneNumbers: PhoneNumber[];
    notes: string;
  }
  export interface Address {
    id: string;
    houseNo: string;
    street1: string;
    street2: string;
    city: string;
    zipCode: number;
    country: string;
  }
  
  export interface PhoneNumber {
    id: string;
    mobile1: string;
  }