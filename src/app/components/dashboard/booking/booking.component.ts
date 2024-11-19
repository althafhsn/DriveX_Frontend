import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookings = [
    { id: '#5D869F5L2', customerName: 'Mason Wilson', pickupDropoff: 'San Diego - Dallas', dateTime: '15 Sept, 8:30AM', status: 'Confirmed' },
    { id: '#3R7G8T9K1', customerName: 'Benjamin Anderson', pickupDropoff: 'New York - Los Angeles', dateTime: '20 Oct, 2:45PM', status: 'Cancelled' },
    // Add more entries as needed
  ];
}
