import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:5147/api/RentalRequest/';

  constructor(private http: HttpClient) {}

  // Method to fetch all cars
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}getAllRentalRequests`);
  }

  performBookingAction(bookingId: string, action: 'approved' | 'cancel'): Observable<any> {
    const url = `${this.baseUrl}${bookingId}/action`; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Optionally add authorization if needed
      // 'Authorization': `Bearer ${this.authService.getToken()}`
    });
  
    return this.http.put(url, { action }, { headers });
  }
  
}