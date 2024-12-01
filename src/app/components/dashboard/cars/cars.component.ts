import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car, CarCustomerResponse } from '../../../models/car.model';
import { Customer } from '../../../models/customer.model';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  carResponse: CarCustomerResponse | null = null;
  @Output() showAddCar = new EventEmitter<void>();


  cars: Car[] = [];
  selectedCars !: CarCustomerResponse

  customers: Customer[] = [];

  filteredCars: Car[] = [];
  selectedCar: Car | null = null;
  selectedCustomer: Customer | null = null;
  isAddCar: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.filteredCars = [...this.cars];
    this.selectedCar = null; // Ensure no car is selected initially
  }


  /**
   * Handle car selection from the list and bind associated customer
   */
  onCarSelected(car: CarCustomerResponse): void {
    this.selectedCars = car
    this.isAddCar = false
  }
  /**
   * Show the Add Car form
   */
  

  openAddCar(): void {
    this.showAddCarForm();
    this.showAddCar.emit(); // Display the AddCarComponent
   
  }

  closeAddCar() {
    this.isAddCar = false; // Hide the AddCarComponent
  }

  showAddCarForm(): void {
    this.isAddCar = true; // Show the Add Customer form
    this.selectedCar = null; // Clear selected customer details
  }

  addNewCar(car: Car) {
    // Logic for adding a new customer (e.g., push to customer list, make an API call)
    console.log('New customer added:', car);
    this.isAddCar = false; // Hide the form after adding the customer
    this.cars.push(car);  // Add the new customer to the list

  }

  /**
   * Handle search query changes to filter cars
   */
  onSearchQueryChange(query: string): void {
    this.filteredCars = this.cars.filter((car) =>
      car.regNo.toLowerCase().includes(query.toLowerCase()) ||
      car.brandId.toLowerCase().includes(query.toLowerCase()) ||
      car.modelId.toLowerCase().includes(query.toLowerCase())
    );
  }
}