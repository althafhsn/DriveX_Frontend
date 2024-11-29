import { Component, Input } from '@angular/core';
import { Car } from '../../../../models/car.model';

@Component({
  selector: 'app-car-revenue-details',
  templateUrl: './car-revenue-details.component.html',
  styleUrl: './car-revenue-details.component.css'
})
export class CarRevenueDetailsComponent {
  @Input() car: Car | null = null;

  // Example revenue details (these should be dynamically retrieved from your backend or state)
  revenueDetails = {
    totalEarnings: 0,
    totalDaysRented: 0,
    numberOfRentals: 0,
  };

  constructor() {}

  ngOnInit(): void {
    // Load revenue details for the specific car
    if (this.car) {
      this.loadCarRevenueDetails();
    }
  }

  loadCarRevenueDetails(): void {
    // Mock revenue data for demonstration purposes (replace with actual data retrieval)
    this.revenueDetails = {
      totalEarnings: (this.car?.pricePerDay || 0),

      totalDaysRented: 10,
      numberOfRentals: 15,
    };
  }
}