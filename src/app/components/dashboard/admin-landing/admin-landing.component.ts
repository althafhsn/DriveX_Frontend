import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserStoreService } from '../../../services/user-store.service';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrl: './admin-landing.component.css'
})
export class AdminLandingComponent implements OnInit{
  public role:string | null = null;
  public token:string | null = null;
  rentalRequestCount: number=0;
   constructor(
     private authService: AuthService,
     private store:UserStoreService,
    private bookingService:BookingService
   ) { }
   

  ngOnInit(): void {
    this.getPendingRentalRequestCount();
    // Fetch and set the user's role
    this.store.getRoleFromStore().subscribe({
      next: (val) => {
        const roleInToken = this.authService.getRoleFromToken();
        this.role = val || roleInToken;
      },
      error: (err) => {
        console.error("Failed to fetch role from store:", err);
      }
    });

    this.token = this.authService.getToken();
    this.store.getRoleFromStore().subscribe({
      next: (val) => {
        this.role = val || this.authService.getRoleFromToken();
      },
      error: (err) => {
        console.error("Failed to fetch role from store:", err);
      }
    });
   
}
getPendingRentalRequestCount(): void {
  this.bookingService.getBookings().subscribe(
    (bookings) => {
      console.log('API Response:', bookings); // Debugging log
      if (Array.isArray(bookings) && bookings.length > 0) {
        this.rentalRequestCount = bookings.filter(booking => booking.action === 'Pending').length;
      }
      console.log('Pending Rental Requests Count:', this.rentalRequestCount); // Check the count
    },
    (error) => {
      console.error('Error fetching bookings', error);
    }
  );
}
}       