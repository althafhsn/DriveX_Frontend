export interface Customer {
    id: string;               
    firstName: string; 
    lastName: string;            
    image: string;        
    phone: string;             
    email: string;
    Licence : string;
    NIC : string;
//      addresses?: Address[];  // Define Address interface if needed
//   phoneNumbers?: PhoneNumber[]; 
      addresses: any[]; // Update later if address details are defined
  phoneNumbers: any[];   
  notes:string;        
   status: 'Available' | 'Unavailable';
  }