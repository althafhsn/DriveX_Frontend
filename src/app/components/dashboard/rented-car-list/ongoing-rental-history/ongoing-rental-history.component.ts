import { Component, Input } from '@angular/core';
import { Booking, Rentals } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ongoing-rental-history',
  templateUrl: './ongoing-rental-history.component.html',
  styleUrl: './ongoing-rental-history.component.css'
})
export class OngoingRentalHistoryComponent {
  @Input() rentals:Rentals[] =[];
  // filteredRented: Booking[] = [];
  query: string = ''; // Search query
  errorMessage: string | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.ongoingRentals().subscribe(
      (data) => {
        this.rentals = data;
        // Filter bookings with ongoingRevenue > 0
        // this.filteredRented = this.booking.filter(booking => booking.ongoingRevenue > 0 ) ;
        // console.log('Filtered ongoing bookings:', this.filteredRented);
      },
      (error) => {
        console.error('Error fetching booking data:', error);
        this.errorMessage = 'Failed to load booking data.';
      }
    );
  }
  returnBooking(bookingId: string): void {
    this.bookingService.performingStatus(bookingId, 'returned').subscribe(
      () => {
        // Filter out the returned booking from the table
        // this.filteredRented = this.filteredRented.filter(booking => booking.id !== bookingId );
        console.log(`Booking ${bookingId} marked as returned`);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating booking status:', error);
        alert('Failed to update booking status. Please try again.');
      }
    );
  }
  // Format date method for displaying dates
  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}



