export interface Car {
  id: string;
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  regNo: string;
  pricePerDay: number;
  gearType: string;
  year: number;
  fuelType: string;
  mileage: string;
  seatCount: string;
  images: Image[];
  status: 'Available' | 'Unavailable';
  startDate:string;
  endDate:string;
  duration:number;
  rentalRequestStatus:string;
  ongoingRevenue:number;
  totalRevenue:number;
  isFavourite?: boolean;

}

export interface newcar{
  id: string;
  brandId:string;
  brandName: string;
  modelId:string;
  modelName: string;
  regNo: string;
  pricePerDay: number;
  gearType: string;
  year: number;
  fuelType: string;
  mileage: string;
  seatCount: string;
  images: Image[];
  startDate:string;
  endDate:string;
  duration:number;
  totalPrice:number;
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
  customer?: Customer[] | null; // Changed to match your JSON response
  message: string;
}

export interface UpdateCar{
  id: string;
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  regNo: string;
  pricePerDay: number;
  gearType: string;
  year: number;
  fuelType: string;
  mileage: string;
  seatCount: string;
  images: Image[];
  status: 'Available' | 'Unavailable';
}


export interface Revenue{
  totalOngoingRevenue:number;
  totalRevenue:number;
  totalCars:number;
  totalCustomers:number;
}

export interface AddFavouriteResponse{
  id:string;
  carId:string;
  userId:string;
}