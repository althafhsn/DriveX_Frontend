import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car} from '../models/car.model';

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
}

// export class BrandService {
//   private apiUrl = 'https://api.example.com/brands'; // Replace with your API endpoint

//   constructor(private http: HttpClient) {}

//   getBrandById(id: string): Observable<{ id: string; name: string }> {
//     return this.http.get<{ id: string; name: string }>(`${this.apiUrl}/${id}`);
//   }
// }
