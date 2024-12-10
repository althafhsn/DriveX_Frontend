import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking, RentalHistory } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  @Input() rentalHistory!: RentalHistory[];
  @Output() bookingUpdated = new EventEmitter<Booking>(); // Output event after update

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getIdFromToken();
    if (userId) {
      this.bookingService.rentalHistory(userId).subscribe(
        (response: RentalHistory[]) => {
          this.rentalHistory = response;
          console.log('Rental history fetched:', this.rentalHistory);
        },
        (error) => {
          console.error('Error fetching rental history:', error);
        }
      );
    }
  }

  isCancelable(rental: RentalHistory): boolean {
    if (rental.action === 'approved') {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const startDate = new Date(rental.startDate).setHours(0, 0, 0, 0);
      const oneDayBeforeStartDate = startDate - 86400000; // Subtract 1 day in milliseconds
      return currentDate <= oneDayBeforeStartDate;
    }
    return false;
  }

  cancelBooking(bookingId: string): void {
    this.bookingService.CancelBookingAction(bookingId, 'cancel').subscribe({
      next: (response: Booking) => {
        console.log('Booking cancelled:', response);
        alert('Booking has been successfully cancelled!');
        this.bookingUpdated.emit(response); // Emit the updated booking
        this.refreshRentalHistory(); // Refresh rental history after cancellation
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again later.');
      },
    });
  }

  refreshRentalHistory(): void {
    const userId = this.authService.getIdFromToken();
    if (userId) {
      this.bookingService.rentalHistory(userId).subscribe(
        (response: RentalHistory[]) => {
          this.rentalHistory = response;
          console.log('Rental history updated:', this.rentalHistory);
        },
        (error) => {
          console.error('Error refreshing rental history:', error);
        }
      );
    }
  }

}
