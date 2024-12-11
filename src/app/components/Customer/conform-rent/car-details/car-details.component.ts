import { Component, Input, OnInit } from '@angular/core';
import { Car, newcar } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';
import { AuthService } from '../../../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../../services/booking.service';
import { rentalRequest } from '../../../../models/booking.model';
// import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  @Input() car!:newcar;
  // car!: any
  @Input() card!: Car; // Ensure card is initialized properly
  pickupDate: string | null = '';
  returnDate: string | null = '';
  isButtonDisabled: boolean = true; // Initially set to true
  dateDifference: number | null = null;
  lastUpdatedDate: string | null = '';
  pickupDateError: string | null = null;
  returnDateError: string | null = null;
  id!: string
duration!:number;
priceperDay!:number;



  constructor(
    private carService: CarService,
    private toastrService: CarService,
    private http: HttpClient,
    private activateRout: ActivatedRoute,
    private authService:AuthService,
    private bookingService:BookingService
  ) { }

  ngOnInit(): void {
    // Load dates from localStorage
    this.pickupDate = localStorage.getItem('pickupDate');
    this.returnDate = localStorage.getItem('returnDate');
    this.lastUpdatedDate = localStorage.getItem('lastUpdatedDate');
    this.checkFields();
   console.log(this.authService.getIdFromToken());
    console.log(this.carService.getCarById)
    console.log('Pickup Date:', this.pickupDate);
    console.log('Return Date:', this.returnDate);
    this.validateDates();



    this.id = this.activateRout.snapshot.paramMap.get('id') || '';
    this.carService.getCarById(this.id).subscribe((data) => {
      console.log('Car details:',data);
      if (data) {
        this.car = data; // Assuming this is how you assign it
        console.log('Car Brand ID:', data.brandId);
      } else {
        console.log('No car data found');
      }
    });

  }
  checkFields(): void {
    this.isButtonDisabled = !this.pickupDate || !this.returnDate;
  }
  bookNow(): void {
    if (!this.pickupDate || !this.returnDate) {
      alert('Please select pickup and return dates!');
      return;
    }
  
    const userId = this.authService.getIdFromToken(); // Fetch userId from token
    if (!userId) {
      alert('Unable to fetch user details. Please login again.');
      return;
    }

    const rentalRequest: rentalRequest = {
      id: '', 
      carId: this.car.id,
      userId,
      startDate: new Date(this.pickupDate).toISOString(), 
      endDate: new Date(this.returnDate).toISOString(),
      action: '',
      status: '',
      duration: 0, 
      requestDate: new Date().toISOString(), 
      totalPrice: 0 
    };

    this.bookingService.placeRentalRequest(rentalRequest).subscribe({
      next: (response) => {
        console.log('Rental request placed successfully:', response);
        alert('Booking successful!');
      },
      error: (error) => {
        console.error('Error placing rental request:', error);
        alert('Booking failed. Please try again.');
      }
    });
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



}
