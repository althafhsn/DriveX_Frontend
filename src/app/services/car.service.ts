import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:5147/api/Car/';

  constructor(private http: HttpClient) {}

  // Method to fetch all cars
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}GetAllCars`);
  }

  getCarDetailsWithCustomer(carId: string): Observable<{ car: Car, customer?: any }> {
    return this.http.get<{ car: Car, customer?: any }>(`${this.baseUrl}${carId}`);
  }
}
