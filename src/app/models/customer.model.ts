export interface Customer {
    id: string;               
    firstName: string; 
    lastName: string;            
    image: string;        
    phone: string;             
    Email: string;             
   status: 'Available' | 'Unavailable';
  }