import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Car, CarCustomerResponse } from '../../../../models/car.model';

import { CarService } from '../../../../services/car.service';
@Component({
  selector: 'app-all-cars-list-dash',
  templateUrl: './all-cars-list.component.html',
  styleUrl: './all-cars-list.component.css'
})
export class AllCarsListComponent {
  @Input() cars: Car[] = []; // Array to store cars fetched from API
  @Output() carSelected = new EventEmitter<CarCustomerResponse>();

  selectedCar!: CarCustomerResponse
  associateCustomer!: any[]
  errorMessage!: string

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    console.log('Cars array on init:', this.cars); // Log cars array to debug
    this.loadCars(); // Load cars from backend
  }

  // Load cars from API
  loadCars(): void {
    this.carService.getCars().subscribe(
      (data: Car[]) => {
        console.log('Fetched car data:', data);
        this.cars = data;
      },
      (error) => {
        console.error('Error fetching car data:', error);
        this.errorMessage = 'Failed to load car data.';
      }
    );
  }

  // Emit selected car and track ID
  selectCar(car: Car): void {
    if (car && car.id) {
      this.carService.getCarDetailsWithCustomer(car.id).subscribe(
        (response) => {
          this.associateCustomer = response.customer || []
          this.selectedCar = response;
          this.carSelected.emit(response)

        },
        (error) => {
          console.error('Error fetching car with customer details:', error);
          this.errorMessage = 'Failed to load car details.';
        }
      );
    }
  }


 

}