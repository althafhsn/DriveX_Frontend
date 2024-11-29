export interface Booking {
    id: string;
    requestDate: string;
    startDate: string;
    endDate: string;
    duration: number;
    totalPrice: number;
    action: string;
    status: string;
    userId: string;
    image: string;
    firstName: string;
    lastName: string;
    nic: string;
    licence: string | null;
    email: string;
    addresses: Address[]; 
    phoneNumbers: PhoneNumber[]; 
    carId: string;
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
  }
  
  export interface Image {
    id: string;
    imagePath: string;
  }

  export interface Address{
    id:string;
    houseNo:string;
    street1:string;
    street2:string;
    city:string;
    zipCode:number;
    country:string;
  }

  export interface PhoneNumber{
    id:string;
    mobile1: string;
  }
  