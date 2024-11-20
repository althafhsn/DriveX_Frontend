import { Component,Output,EventEmitter } from '@angular/core';
import { Customer } from '../../../../models/customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  @Output() customerAdded: EventEmitter<Customer> = new EventEmitter();  // Output event to notify parent component

  // Initialize the new customer object based on the model
  newCustomer: Customer = {
    id: '', // will be generated when adding
    name: '',
    avatarUrl: '',
    tripsCompleted: 0,
    totalTraveled: 0,
    accidentHistory: 0,
    passengerCapacity: 0,
    phone: '',
    email: '',
    status: 'Available' // Default status
  };

  constructor() { }

  // Method to handle adding the new customer
  addCustomer() {
    // Generate a unique ID for the customer (this can be handled differently, e.g., by backend service)
    this.newCustomer.id = this.generateUniqueId();

    // Emit the newly created customer to the parent component
    this.customerAdded.emit(this.newCustomer);

    // Reset the form
    this.newCustomer = {
      id: '',
      name: '',
      avatarUrl: '',
      tripsCompleted: 0,
      totalTraveled: 0,
      accidentHistory: 0,
      passengerCapacity: 0,
      phone: '',
      email: '',
      status: 'Available'
    };
  }

  // Simple method to generate a unique ID for the customer (this can be improved for production)
  private generateUniqueId(): string {
    return 'cust-' + Math.random().toString(36).substr(2, 9);  // Random ID generation (for example purpose)
  }
}
