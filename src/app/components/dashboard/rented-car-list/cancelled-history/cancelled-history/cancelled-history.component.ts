import { Component, Input } from '@angular/core';
import { Rentals } from '../../../../../models/booking.model';
import { BookingService } from '../../../../../services/booking.service';

@Component({
  selector: 'app-cancelled-history',
  templateUrl: './cancelled-history.component.html',
  styleUrl: './cancelled-history.component.css'
})
export class CancelledHistoryComponent {
  @Input() rentals: Rentals[] = [];
  query: string = ''; 
  errorMessage: string | null = null;

  constructor(private bookingService:BookingService){}


  ngOnInit(): void {
    this.cancelledHistory();
  }

  cancelledHistory(): void {
    this.bookingService.cancelledHistory().subscribe(
      (data) => {
        console.log('API response:', data);
        this.rentals = data;
      },
      (error) => {
        console.error('Error fetching booking data:', error);
        this.errorMessage = 'Failed to load booking data.';
      }
    );
  }
  

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}
