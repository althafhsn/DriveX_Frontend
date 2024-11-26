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
    firstName: '',
    lastName:'',
    image: '',
    phone: '',
    email: '',
    Licence : '',
    NIC : '',
    addresses:[], // Update later if address details are defined
  phoneNumbers:[] ,
  notes:'',  
    status: 'Available' // Default status
  };

  constructor() { }

  // Method to handle adding the new customer
  addCustomer() {
    // Generate a unique ID for the customer (this can be handled differently, e.g., by backend service)
    

    // Emit the newly created customer to the parent component
    this.customerAdded.emit(this.newCustomer);

    // Reset the form
    this.newCustomer = {
      id: '', // will be generated when adding
    firstName: '',
    lastName:'',
    image: '',
    phone: '',
    email: '',
    Licence : '',
    NIC : '',
    addresses:[], // Update later if address details are defined
  phoneNumbers:[] ,
  notes:'',  
    status: 'Available' // Default status
    };
  }

  // Simple method to generate a unique ID for the customer (this can be improved for production)
 
}
