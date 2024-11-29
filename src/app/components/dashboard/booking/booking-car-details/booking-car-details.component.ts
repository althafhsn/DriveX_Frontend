import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookingService } from '../../../../services/booking.service';
import { Booking } from '../../../../models/booking.model';

@Component({
  selector: 'app-booking-car-details',
  templateUrl: './booking-car-details.component.html',
  styleUrl: './booking-car-details.component.css'
})
export class BookingCarDetailsComponent {
  @Input() booking: Booking | null = null; 
}
