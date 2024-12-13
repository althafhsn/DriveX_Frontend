import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Car, CarCustomerResponse } from '../../../../models/car.model';

import { CarService } from '../../../../services/car.service';
import { SearchService } from '../../../../services/search.service';
@Component({
  selector: 'app-all-cars-list-dash',
  templateUrl: './all-cars-list.component.html',
  styleUrl: './all-cars-list.component.css'
})
export class AllCarsListComponent {
  @Input() cars: Car[] = []; 
  @Output() carSelected = new EventEmitter<CarCustomerResponse>();
  @Input() searchText: string = '';
  selectedCar!: CarCustomerResponse
  associateCustomer!: any[]
  errorMessage!: string

  constructor(private carService: CarService,
    private searchService:SearchService

  ) { }

  ngOnInit(): void {
    this.loadCars(); // Load cars from backend
    this.searchService.searchText$.subscribe(
      (text) => (this.searchText = text)
    );
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