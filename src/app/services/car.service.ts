import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CarCustomerResponse, newcar } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://localhost:5147/api/Car/';
  private brandBaseUrl = 'http://localhost:5147/api/Brand/';
  private modelBaseUrl = 'http://localhost:5147/api/Model/';

  constructor(private http: HttpClient) {}


  getBrands(): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(`${this.brandBaseUrl}get-all-brand`);
  }

  addBrand(name: string): Observable<any> {
    return this.http.post(`${this.brandBaseUrl}add-new-brand`, { name });
  }

  getModels(brandId: string): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(`${this.modelBaseUrl}brand/${brandId}`);
  }

  addModel(name: string, brandId: string): Observable<any> {
    return this.http.post(`${this.modelBaseUrl}add-new-model`, { name, brandId });
  }

  addCar(carData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, carData);
  }
  // Method to fetch all cars
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}GetAllCars`);
  }
  updateCar(car: Car): Observable<any> {
    const url = `${this.baseUrl}UpdateCar${car.id}`;  
    console.log('Sending request to update car:', car); 
    return this.http.put<any>(url, car);
    }

  getCarDetailsWithCustomer(carId: string): Observable<CarCustomerResponse> {
    return this.http.get<CarCustomerResponse>(`${this.baseUrl}${carId}`);
  }
  
  deleteCar(carId: string): Observable<CarCustomerResponse> {
    return this.http.delete<CarCustomerResponse> (`${this.baseUrl}DeleteCar${carId}`); 
  }


  getCarById(carId: string): Observable<newcar> {
    return this.http.get<newcar>(`${this.baseUrl}getById?id=${carId}`);
  }
  
}
// http://localhost:5147/api/Car/
// http://localhost:5147/api/Car/GetCarById7147a658-ed4f-461a-f287-08dd09f2487e