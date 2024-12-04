import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerStateService {
  private isCustomerComponentActive = new BehaviorSubject<boolean>(false);

  // Observable to expose the state
  isCustomerActive$ = this.isCustomerComponentActive.asObservable();

  // Method to update the state
  setCustomerActiveState(isActive: boolean): void {
    this.isCustomerComponentActive.next(isActive);
  }
}
