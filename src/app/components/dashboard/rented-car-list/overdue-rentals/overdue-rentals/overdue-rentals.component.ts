import { Component, Input } from '@angular/core';
import { OverDueRentals } from '../../../../../models/booking.model';
import { BookingService } from '../../../../../services/booking.service';

@Component({
  selector: 'app-overdue-rentals',
  templateUrl: './overdue-rentals.component.html',
  styleUrl: './overdue-rentals.component.css'
})
export class OverdueRentalsComponent {
@Input() overDues!:OverDueRentals[];
query: string = ''; // Search query
errorMessage: string | null = null;


constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.OverDueRentals();
  }

  OverDueRentals(): void {
    this.bookingService.overDueRentals().subscribe(
      (data) => {
        this.overDues = data;
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
