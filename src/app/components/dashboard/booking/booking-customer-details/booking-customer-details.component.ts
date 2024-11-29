import { Component, Input } from '@angular/core';
import { Booking } from '../../../../models/booking.model';

@Component({
  selector: 'app-booking-customer-details',
  templateUrl: './booking-customer-details.component.html',
  styleUrl: './booking-customer-details.component.css'
})
export class BookingCustomerDetailsComponent {
  @Input() booking: Booking | null = null; 
}
