import { Component,Input } from '@angular/core';
import { Car } from '../../../../models/car.model';

@Component({
  selector: 'app-car-trip-history',
  templateUrl: './car-trip-history.component.html',
  styleUrl: './car-trip-history.component.css'
})
export class CarTripHistoryComponent {
  @Input() car: Car | null = null;

  // Example trip history data (these should be dynamically retrieved from your backend or state)
  tripHistory = [
    {
      tripId: 'TRIP001',
      date: '2024-11-01',
      destination: 'City A',
      duration: '5 hours',
      earnings: 250,
    },
    {
      tripId: 'TRIP002',
      date: '2024-11-05',
      destination: 'City B',
      duration: '3 hours',
      earnings: 150,
    },
    {
      tripId: 'TRIP003',
      date: '2024-11-10',
      destination: 'City C',
      duration: '7 hours',
      earnings: 350,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Load trip history for the specific car
    if (this.car) {
      this.loadCarTripHistory();
    }
  }

  loadCarTripHistory(): void {
    // Mock trip history data for demonstration purposes (replace with actual data retrieval)
    this.tripHistory = [
      {
        tripId: 'TRIP001',
        date: '2024-11-01',
        destination: 'City A',
        duration: '5 hours',
        earnings: (this.car?.pricePerDay || 0) * 2,// Example calculation
      },
      {
        tripId: 'TRIP002',
        date: '2024-11-05',
        destination: 'City B',
        duration: '3 hours',
        earnings: (this.car?.pricePerDay || 0) * 3, // Example calculation
      },
    ];
  }
}