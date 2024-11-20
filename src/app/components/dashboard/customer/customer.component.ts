import { Component } from '@angular/core';
import { Customer } from '../../../models/customer.model';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  selectedCustomer: Customer | null = null; 
  isAddCustomer: boolean = false; 

  constructor() {}
  customers: Customer[] = [
    {
      id: 'GF491T4D',
      name: 'Alex Norman',
      status: 'Available', 
      avatarUrl: 'https://via.placeholder.com/50',
      email: 'alex@example.com',
      phone: '+123456789',
      tripsCompleted: 15,
      totalTraveled: 300,
      accidentHistory: 1,
      passengerCapacity: 4
    },
    {
      id: 'GF491T4E',
      name: 'Ethan Miller',
      status: 'Unavailable',
      avatarUrl: 'https://via.placeholder.com/50',
      email: 'ethan@example.com',
      phone: '+987654321',
      tripsCompleted: 20,
      totalTraveled: 500,
      accidentHistory: 0,
      passengerCapacity: 4
    }
    // Add more customers...
  ];
  // Event triggered when a customer is selected from the list
  onCustomerSelected(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isAddCustomer = false;
  }
  // Method to toggle the form visibility to add a new customer
  showAddCustomerForm() {
    this.isAddCustomer = true; // Show the add customer form
    this.selectedCustomer = null; // Hide the selected customer details when adding a new customer
  }

  // Method to handle the new customer data (when added)
  addNewCustomer(customer: Customer) {
    // Logic for adding a new customer (e.g., push to customer list, make an API call)
    console.log('New customer added:', customer);
    this.isAddCustomer = false; // Hide the form after adding the customer
    this.customers.push(customer);  // Add the new customer to the list

  }
 
}