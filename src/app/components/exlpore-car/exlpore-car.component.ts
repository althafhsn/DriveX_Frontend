import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-exlpore-car',
  templateUrl: './exlpore-car.component.html',
  styleUrls: ['./exlpore-car.component.css']
})
export class ExlporeCarComponent implements OnInit {
  cars: Car[] = []; // Populate this with your car data
  selectedCar!: Car;
  showCarList: boolean = true; // Flag to control visibility of the car list
filteredCars: Car[] | undefined;



  ngOnInit(): void {
    // Initialize the list of cars, perhaps by fetching them from an API
  }

  // This method gets called when a car is selected in AllCarsComponent
  onCarSelected(car: Car): void {
    this.selectedCar = car;  // Set the selected car to pass it to CarDetailsComponent
    this.showCarList = false; // Hide the car list after selecting a car
  }

  // Method to go back to car list
  backToCarList(): void {
    this.showCarList = true; // Show the car list again
    this.selectedCar = null!; // Clear the selected car
  }
}
