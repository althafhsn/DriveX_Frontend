import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  pickupDate: string | null = '';
  returnDate: string | null = '';
  dateDifference: number | null = null;
  lastUpdatedDate: string | null = '';

  ngOnInit(): void {
    // Load dates from localStorage
    this.pickupDate = localStorage.getItem('pickupDate');
    this.returnDate = localStorage.getItem('returnDate');
    this.lastUpdatedDate = localStorage.getItem('lastUpdatedDate');

    // Calculate date difference if dates exist
    if (this.pickupDate && this.returnDate) {
      this.calculateDateDifference();
    }
  }

  calculateDateDifference(): void {
    if (this.pickupDate && this.returnDate) {
      const pickup = new Date(this.pickupDate);
      const returnD = new Date(this.returnDate);

      if (returnD > pickup) {
        const timeDiff = returnD.getTime() - pickup.getTime();
        this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
      } else {
        this.dateDifference = null;
        alert('Return date must be after the pickup date.');
      }
    }
  }

  saveDates(): void {
    if (this.pickupDate && this.returnDate) {
      localStorage.setItem('pickupDate', this.pickupDate);
      localStorage.setItem('returnDate', this.returnDate);

      // Store the last updated date
      const now = new Date();
      this.lastUpdatedDate = now.toLocaleString();
      localStorage.setItem('lastUpdatedDate', this.lastUpdatedDate);

      alert('Dates have been saved successfully.');
    } else {
      alert('Please provide valid dates.');
    }
  }

 
}