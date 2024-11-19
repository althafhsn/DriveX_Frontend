import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent {
  // Sample data for editing
  @Input() car = {
    brand: '',
    model: '',
    year: '',
    mileage: '',
    fuelType: '',
    gearType: '',
    dailyPrice: 0,
    hourlyPrice: 0
  };

  // Method to handle form submission
  onSubmit() {
    console.log('Updated Car:', this.car);
    alert('Car details updated successfully!');
  }
}