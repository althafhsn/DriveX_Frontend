import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking, OverDueRentals, RecentRentals, RentalHistory, rentalRequest, Rentals } from '../models/booking.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:5147/api/RentalRequest/';
    private isBookingComponentActive = new BehaviorSubject<boolean>(false);
    isBookingActive$ = this.isBookingComponentActive.asObservable();
    setBookingActiveState(isActive: boolean): void {
      this.isBookingComponentActive.next(isActive);
    }

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
  
 
  CancelBookingAction(bookingId: string, action:'cancel'): Observable<any> {
    const url = `${this.baseUrl}${bookingId}/cancel-by-user`; 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.put(url, { action }, { headers });
  }

  performingStatus(bookingId:string,status: 'returned' | 'rented'): Observable<any> {
   const url = `${this.baseUrl}${bookingId}/status`;
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
   });
   return this.http.put(url, { status }, { headers });
  }

  ongoingRentals(): Observable<Rentals[]>{
    return this.http.get<Rentals[]>(`${this.baseUrl}ongoingRentals`);
  }

  rentedHistory(): Observable<Rentals[]>{
    return this.http.get<Rentals[]>(`${this.baseUrl}allRented`);
  }

  cancelledHistory(): Observable<Rentals[]> {
    return this.http.get<Rentals[]>(`${this.baseUrl}allCancelledRentals`);
  }
  
  overDueRentals(): Observable<OverDueRentals[]> {
    return this.http.get<OverDueRentals[]>(`${this.baseUrl}overdue-with-amount`);
  }
  
  recentRentals(): Observable<RecentRentals[]>{
    return this.http.get<RecentRentals[]>(`${this.baseUrl}recentRentalRequest`);
  }

  rentalHistory(userId:string):Observable<RentalHistory[]>{
    return this.http.get<RentalHistory[]>(`${this.baseUrl}customer/${userId}`)
  }
  
  placeRentalRequest(requestBody: rentalRequest): Observable<any> {
    return this.http.post<rentalRequest>(`${this.baseUrl}`,requestBody);
  }
}
