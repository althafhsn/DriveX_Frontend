import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerStateService {
  private isCustomerActive = new BehaviorSubject<boolean>(false);
  private isBookingActive = new BehaviorSubject<boolean>(false);
  private isCarActive = new BehaviorSubject<boolean>(false);

  // Exposed observables
  isCustomerActive$ = this.isCustomerActive.asObservable();
  isBookingActive$ = this.isBookingActive.asObservable();
  isCarActive$ = this.isCarActive.asObservable();

  // Methods to update states
  setCustomerActiveState(isActive: boolean): void {
    this.isCustomerActive.next(isActive);
  }

  setBookingActiveState(isActive: boolean): void {
    this.isBookingActive.next(isActive);
  }

  setCarActiveState(isActive: boolean): void {
    this.isCarActive.next(isActive);
  }
}
