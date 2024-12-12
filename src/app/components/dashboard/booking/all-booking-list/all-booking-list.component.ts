import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-all-booking-list',
  templateUrl: './all-booking-list.component.html',
  styleUrl: './all-booking-list.component.css'
})
export class AllBookingListComponent {
  @Input() bookings: Booking[] = []; // Array to store bookings fetched from API
  @Output() bookingSelected = new EventEmitter<Booking>(); // Emit the selected booking object
  @Input() searchText: string = '';

  selectedBookingId: string | null = null; // Track the selected booking ID
  errorMessage: string | null = null;


  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    console.log('Bookings array on init:', this.bookings); // Log bookings array to debug
    this.loadBookings(); // Load bookings from backend
  }

  // Load bookings from API
  loadBookings(): void {
    this.bookingService.getBookings().subscribe(
      (data: Booking[]) => {
        console.log('Fetched booking data:', data);
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching booking data:', error);
        this.errorMessage = 'Failed to load booking data.';
      }
    );
  }


  // Method to select a booking and emit the selected booking
  selectBooking(booking: Booking): void {
    this.bookingSelected.emit(booking);  // Emit the selected booking to the parent component
  }
}
