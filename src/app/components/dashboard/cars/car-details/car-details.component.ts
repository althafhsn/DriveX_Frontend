import { Component, Input } from '@angular/core';
import { Car, CarCustomerResponse } from '../../../../models/car.model';
import { Customer } from '../../../../models/customer.model';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-car-details-dash',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  @Input() carResponse: CarCustomerResponse | null = null;  // Input property for the selected car
  @Input() customer: Customer | null = null;  // Input property for the associated customer
 @Input() selectedImage: string | null = null;  // Property to track the selected image


  constructor(
    private route : ActivatedRoute,
    private carService : CarService,
  ) {}

  ngOnInit(): void {
    if (!this.carResponse) {
      console.warn('No car details provided.');
    } else {
      console.log('Selected car:', this.carResponse);
      // Set the first image as the default selected image
      this.selectedImage = this.carResponse.car.images[0].imagePath || null;
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
