export interface Car {
    id: string;  // The 'id' is a string based on your example
    brandId: string;  // Corrected to 'brandId' (case-sensitive)
    brandName: string;
    modelId: string;  // Corrected to 'modelId' (case-sensitive)
    modelName: string;
    regNo: string;
    pricePerDay: number;
    gearType: string;
    fuelType: string;
    mileage: string;
    seatCount: string;
    images: Image[];  // This should remain as an array of Image objects
    status: 'Available' | 'Unavailable';  // Status should be either Available or Unavailable
    customerId?: string;  // Optional field
  }
  
  export interface Image {
    id: string;  // The 'id' of the image
    imagePath: string;  // The 'imagePath' for the image file (relative path or URL)
  }
  