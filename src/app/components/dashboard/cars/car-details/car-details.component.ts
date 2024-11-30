import { Component, Input } from '@angular/core';
import { Car, CarCustomerResponse } from '../../../../models/car.model';
import { Customer } from '../../../../models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-car-details-dash',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  @Input() carResponse!: CarCustomerResponse;  
  @Input() customer: Customer | null = null;  
 @Input() selectedImage: string | null = null;  
 isEditable = false;
carId!:string;

  constructor(
    private route : ActivatedRoute,
    private carService : CarService,
    private router: Router
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

  toggleEdit(): void {
    if (this.isEditable) {
      this.saveCarDetails(); // Call saveCustomerDetails when in "Save" mode
    }
    this.isEditable = !this.isEditable; // Toggle edit mode
  }

  saveCarDetails(): void {
    if (this.carResponse?.car) {
      this.carService.updateCar(this.carResponse.car).subscribe(
        (response) => {
          console.log('Customer details updated successfully', response);
          this.isEditable = false; // Turn off edit mode after saving
        },
        (error) => {
          console.error('Error updating customer details:', error);
        }
      );
    }
  }

  deleteCar(): void {
    // Show confirmation prompt before deleting the car
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(this.carId).subscribe(
        (response) => {
          alert('Car deleted successfully!');
          // You may want to remove the car from a list in the UI or update your local state
        },
        (error) => {
          alert('The car is associated in rental request table!');
        }
      );
    }
  }
}
