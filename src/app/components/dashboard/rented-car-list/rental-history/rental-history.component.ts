import { Component, Input } from '@angular/core';
import { Booking, Rentals } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent {
  @Input() rentals: Rentals[] = [];
  // filteredRented: Booking[] = [];
  query: string = ''; // Search query
  errorMessage: string | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.rentedHistory().subscribe(
      (data) => {
        this.rentals = data;
        // Filter bookings with ongoingRevenue > 0
        // this.filteredRented = this.booking.filter(booking => booking.totalRevenue > 0 && booking.status =='returned');
        // console.log('Filtered ongoing bookings:', this.filteredRented);
      },
      (error) => {
        console.error('Error fetching booking data:', error);
        this.errorMessage = 'Failed to load booking data.';
      }
    );
  }

  // Format date method for displaying dates
  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}


