export interface Customer {
    id: string;                // Unique identifier for the customer
    name: string;              // Customer's name
    avatarUrl: string;         // URL for the customer's avatar or profile picture
    tripsCompleted: number;    // Number of trips the customer has completed
    totalTraveled: number;     // Total kilometers traveled by the customer
    accidentHistory: number;   // Number of accidents in the customer's record
    passengerCapacity: number; // Number of passengers the customer can accommodate
    phone: string;             // Customer's phone number
    email: string;             // Customer's email address
    status: 'Available' | 'Unavailable';
  }