import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  @Input() booking: Booking | null = null; // Input booking from parent
  @Output() bookingUpdated = new EventEmitter<Booking>(); // Output event after update

  constructor(private bookingService: BookingService) {}

  // Confirm the booking
  confirmBooking(): void {
    if (this.booking) {
      this.bookingService.performBookingAction(this.booking.id, 'approved').subscribe({
        next: (response: Booking) => {
          console.log('Booking confirmed:', response);
          alert('Booking has been confirmed!');
          this.bookingUpdated.emit(response); // Emit the updated booking
        },
        error: (error) => {
          console.error('Error confirming booking:', error);
          alert('Failed to confirm booking. Please try again.');
        },
      });
    }
  }

  // Cancel the booking
  cancelBooking(): void {
    if (this.booking) {
      this.bookingService.performBookingAction(this.booking.id, 'cancel').subscribe({
        next: (response: Booking) => {
          console.log('Booking cancelled:', response);
          alert('Booking has been cancelled!');
          this.bookingUpdated.emit(response); // Emit the updated booking
        },
        error: (error) => {
          console.error('Error cancelling booking:', error);
          alert('Failed to cancel booking. Please try again.');
        },
      });
    }
  }
}
