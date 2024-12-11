export interface profileCustomer {
    id: string;
    firstName: string;
    lastName: string;
    image?: string | null;
    email: string;
    licence: string;
    nic: string;
    addresses: Address[];
    phoneNumbers: PhoneNumber[];
}

export interface Address {
  id: string;
    houseNo: string;
    street1: string;
    street2?: string | null;
    city: string;
    zipCode: number;
    country: string;
  }
  
  export interface PhoneNumber {
    id: string;
    mobile1: string;
  }