import { Component, Input, OnChanges  } from '@angular/core';
interface Trip {
  id: string;
  origin: string;
  destination: string;
  status: string;
}
@Component({
  selector: 'app-customer-trip-history',
  templateUrl: './customer-trip-history.component.html',
  styleUrl: './customer-trip-history.component.css'
})
export class CustomerTripHistoryComponent implements OnChanges {
  @Input() customerId!: string; // Accepts the selected customer's ID
  tripHistory: Trip[] = []; // List of trips for the selected customer

  ngOnChanges(): void {
    if (this.customerId) {
      this.fetchTripHistory(this.customerId);
    } else {
      console.warn('No customer ID provided');
      this.tripHistory = [];
    }
  }

  fetchTripHistory(customerId: string): void {
    // Simulate API response with mock data
    this.tripHistory = [
      {
        id: '#5D869F5L2',
        origin: 'San Diego',
        destination: 'Dallas',
        status: 'Completed'
      },
      {
        id: '#8E969P5L4',
        origin: 'Phoenix',
        destination: 'San Jose',
        status: 'Cancelled'
      },
      {
        id: '#3H359K9L1',
        origin: 'San Francisco',
        destination: 'Austin',
        status: 'Completed'
      }
    ];
  }
}
