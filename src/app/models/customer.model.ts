export interface Customer {
    id: string;               
    firstName: string; 
    lastName: string;            
    image: string;        
    phone: string;             
    email:string;           
    status: 'Available' | 'Unavailable';
  }