import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';
// import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  @Input() cars: Car[] = [];
  @Input() card!: Car; // Ensure card is initialized properly
  pickupDate: string | null = '';
  returnDate: string | null = '';
  isButtonDisabled: boolean = true; // Initially set to true
  dateDifference: number | null = null;
  lastUpdatedDate: string | null = '';
  pickupDateError: string | null = null;
  returnDateError: string | null = null;

  constructor(private carService: CarService , toastrService: CarService) {}

  ngOnInit(): void {
    // Load dates from localStorage
    this.pickupDate = localStorage.getItem('pickupDate');
    this.returnDate = localStorage.getItem('returnDate');
    this.lastUpdatedDate = localStorage.getItem('lastUpdatedDate');
    this.checkFields(); // Check field states on component load

    this.validateDates();
  }
  checkFields(): void {
    // Check if both fields are filled
    this.isButtonDisabled = !this.pickupDate || !this.returnDate;
  }


  validateDates(): void {
    this.pickupDateError = null;
    this.returnDateError = null;

    const today = new Date().setHours(0, 0, 0, 0); // Today's date at midnight
    const pickup = this.pickupDate ? new Date(this.pickupDate).setHours(0, 0, 0, 0) : null;
    const returnD = this.returnDate ? new Date(this.returnDate).setHours(0, 0, 0, 0) : null;

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
      const timeDiff = returnD - pickup;
      this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.dateDifference = null;
    }
  }

  saveDates(): void {

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to book. Redirecting to login page...');
      window.location.href = '/login'; // Redirect to login page
      return;
    }

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

  // saveDates(): void {
  //   if (this.pickupDate && this.returnDate && !this.pickupDateError && !this.returnDateError) {
  //     localStorage.setItem('pickupDate', this.pickupDate);
  //     localStorage.setItem('returnDate', this.returnDate);
  
  //     // Store the last updated date
  //     const now = new Date();
  //     this.lastUpdatedDate = now.toLocaleString();
  //     localStorage.setItem('lastUpdatedDate', this.lastUpdatedDate);
  
  //     this.toastrService.success('Dates have been saved successfully.', 'Success', {
  //       timeOut: 3000,
  //     });
  //   } else {
  //     this.toastrService.error('Please correct the errors before saving.', 'Error', {
  //       timeOut: 3000,
  //     });
  //   }
  // }
  
}
