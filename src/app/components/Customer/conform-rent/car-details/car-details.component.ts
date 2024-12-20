import { Component, Input, OnInit } from '@angular/core';
import { Car, newcar } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';
import { AuthService } from '../../../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../../services/booking.service';
import { rentalRequest } from '../../../../models/booking.model';
import { NgToastService } from 'ng-angular-popup';
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
    private bookingService:BookingService,
    private toast: NgToastService,
    private router: Router
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
      this.toast.danger("Error", "Please select pickup and return dates!", 5000);
      return;
    }
  
    const userId = this.authService.getIdFromToken();
    if (!userId) {
      this.toast.danger("Error", "Unable to fetch user details. Please login again.", 5000);
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
        this.toast.success("Success", "Booking successful!", 5000);
      },
      error: (error) => {
        console.error('Full error object:', JSON.stringify(error, null, 2));
  
        let backendErrorMessage = 'An unknown error occurred.';
        let statusCode = error.status || 'Unknown';
        let statusText = error.statusText || 'Unknown';
  
        console.log('Status code:', statusCode);
        console.log('Message:', error.error);
        console.log('Status text:', statusText);
  
        if (error instanceof HttpErrorResponse) {
          if (error.error) {
            if (typeof error.error === 'string') {
              backendErrorMessage = error.error; // If the error message is a simple string
            } else if (typeof error.error === 'object') {
              // Extract meaningful message if the error contains nested information
              backendErrorMessage = error.error.error || error.error.error || error.error;
            }
          } else {
            backendErrorMessage = error.error;
          }
        } else if (error) {
          backendErrorMessage = error.error;
          ;
        }
  
        console.log('Extracted error message:', backendErrorMessage);
  
        // Handle specific backend error messages
        switch (backendErrorMessage) {
          case "User's primary address must include HouseNo, Street1, City, and Country.":
            this.toast.danger("Error", "Your primary address is incomplete. Please update your profile.", 5000);
            this.router.navigate(['landing/profile']);
            break;
          case "Car not found.":
            this.toast.danger("Error", "The selected car could not be found. Please try again.", 5000);
            break;
          case "User not found.":
            this.toast.danger("Error", "User not found. Please log in again.", 5000);
            break;
          case "User's license is required.":
            this.toast.danger("Error", "Your license information is required. Please update your profile.", 5000);
            this.router.navigate(['landing/profile']);
            break;
          case "User's primary phone number is required.":
            this.toast.danger("Error", "Your primary phone number is required. Please update your profile.", 5000);
            this.router.navigate(['landing/profile']);
            break;
          case "The requested rental period conflicts with an existing rental.":
            this.toast.danger("Error", "The selected rental period conflicts with an existing booking. Please choose different dates.", 5000);
            break;
          case "End date must be later than start date.":
            this.toast.danger("Error", "The end date must be later than the start date.", 5000);
            break;
          default:
            // Default message if no case matches
            this.toast.danger("Error", backendErrorMessage || "Unable to process your request at this time. Please try again later.", 5000);
            break;
        }
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
      // alert('You must be logged in to book. Redirecting to login page...');
      this.toast.warning("Warning", "You must be logged in to book. Redirecting to login page...", 5000);
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

      // alert('Dates have been saved successfully.');
      this.toast.success("Success", "Dates have been saved successfully", 5000);
    } else {
      // alert('Please correct the errors before saving.');
      this.toast.danger("Error", "Please correct the errors before saving.", 5000);
    }
  }



}
