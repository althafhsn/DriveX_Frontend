import { Component, Input} from '@angular/core';
import { Car } from '../../../../models/car.model';
import { Customer } from '../../../../models/customer.model';
@Component({
  selector: 'app-car-details-dash',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  @Input() car: Car | null = null; // Input property for the selected car
  @Input() customer: Customer | null = null; // Input property for the associated customer

  constructor() {}

  ngOnInit(): void {
    if (!this.car) {
      console.warn('No car details provided.');
    } else {
      console.log('Selected car:', this.car);
    }

    if (!this.customer) {
      console.warn('No customer details provided.');
    } else {
      console.log('Associated customer:', this.customer);
    }
  }
}