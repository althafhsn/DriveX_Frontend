import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor() {}

  getStatistics(): Observable<any> {
    // Simulated API response
    const statistics = {
      totalEarnings: 352893,
      amountsPaid: 88089,
      totalRefunds: 13893
    };

    return of(statistics); // Replace with an actual HTTP request when needed
  }
}
