export interface Car {
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
    images: Image[];  
    status: 'Available' | 'Unavailable';  
    customerId?: string;  
  }
  
  export interface Image {
    id: string; 
    imagePath: string;  
  }
  
  export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    nic: string;
    phoneNumbers: PhoneNumber[];
  }
 
  export interface PhoneNumber {
    id: string;
    mobile1: string;
  }
   export interface CarCustomerResponse {
    car: Car;
    customer?: Customer; 
    message: string;
  }