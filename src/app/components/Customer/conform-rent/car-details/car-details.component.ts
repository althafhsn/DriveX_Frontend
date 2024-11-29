import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  pickupDate: string | null = '';
  returnDate: string | null = '';
  dateDifference: number | null = null;
  lastUpdatedDate: string | null = '';
  pickupDateError: string | null = null;
  returnDateError: string | null = null;

  ngOnInit(): void {
    // Load dates from localStorage
    this.pickupDate = localStorage.getItem('pickupDate');
    this.returnDate = localStorage.getItem('returnDate');
    this.lastUpdatedDate = localStorage.getItem('lastUpdatedDate');

    this.validateDates();
  }

  validateDates(): void {
    this.pickupDateError = null;
    this.returnDateError = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const pickup = this.pickupDate ? new Date(this.pickupDate) : null;
    const returnD = this.returnDate ? new Date(this.returnDate) : null;

    // Validate Pickup Date
    if (pickup && pickup < today) {
      this.pickupDateError = 'Pickup date cannot be in the past.';
    }

    // Validate Return Date
    if (returnD) {
      if (!pickup) {
        this.returnDateError = 'Please select a pickup date first.';
      } else if (returnD <= pickup) {
        this.returnDateError = 'Return date must be after the pickup date.';
      }
    }

    // Calculate date difference if valid
    if (pickup && returnD && !this.pickupDateError && !this.returnDateError) {
      const timeDiff = returnD.getTime() - pickup.getTime();
      this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.dateDifference = null;
    }
  }

  saveDates(): void {
    if (this.pickupDate && this.returnDate && !this.pickupDateError && !this.returnDateError) {
      localStorage.setItem('pickupDate', this.pickupDate);
      localStorage.setItem('returnDate', this.returnDate);

      // Store the last updated date
      const now = new Date();
      this.lastUpdatedDate = now.toLocaleString();
      localStorage.setItem('lastUpdatedDate', this.lastUpdatedDate);

      alert('Dates have been saved successfully.');
    } else {
      alert('Please correct the errors before saving.');
    }
  }
}
