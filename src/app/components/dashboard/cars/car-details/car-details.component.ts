import { Component, Input } from '@angular/core';
import { Car, CarCustomerResponse } from '../../../../models/car.model';
import { Customer } from '../../../../models/customer.model';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-car-details-dash',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  @Input() car: Car | null = null;  // Input property for the selected car
  @Input() customer: Customer | null = null;  // Input property for the associated customer
 @Input() selectedImage: string | null = null;  // Property to track the selected image
@Input() carCustomerResponse!: CarCustomerResponse;
@Input() selectedCar
associatedCustomer: any = null;
carId :string | null = null;
  constructor(carService:CarService) {}

  ngOnInit(): void {
    if (!this.car) {
      console.warn('No car details provided.');
    } else {
      console.log('Selected car:', this.car);
      // Set the first image as the default selected image
      this.selectedImage = this.car.images?.[0]?.imagePath || null;
    }

    if (!this.customer) {
      console.warn('No customer details provided.');
    } else {
      console.log('Associated customer:', this.customer);
    }
  }

  // Method to handle image click
  onImageClick(image: { imagePath: string }): void {
    this.selectedImage = image.imagePath;
    console.log('Selected Image:', this.selectedImage);
  }
}
