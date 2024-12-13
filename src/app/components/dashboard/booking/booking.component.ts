import { Component } from '@angular/core';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  selectedBooking: Booking | null = null;
  booking: Booking [] = [];
  searchText: string = '';

}
