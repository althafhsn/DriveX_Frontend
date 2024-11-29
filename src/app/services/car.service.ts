import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CarCustomerResponse } from '../models/car.model';

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

  getCarDetailsWithCustomer(carId: string): Observable<CarCustomerResponse> {
    return this.http.get<CarCustomerResponse>(`${this.baseUrl}${carId}`);
  }
  
}
