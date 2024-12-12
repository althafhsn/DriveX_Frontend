import { Component,Input } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

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
  constructor(
   
    private toast: NgToastService
   
  ) { }

  // Method to handle form submission
  onSubmit() {
    console.log('Updated Car:', this.car);
    // alert('Car details updated successfully!');
    this.toast.success("Success", "Car details updated successfully!", 5000);

  }
}