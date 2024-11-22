import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customer.model';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  selectedCustomer: Customer | null = null; 
  isAddCustomer: boolean = false; 
  

  constructor() {}
  ngOnInit(): void {}
  customers: Customer[] = [
  
  ];

  filteredCustomers: Customer[] = [...this.customers];

  filterCustomers(query: string): void {
    if (!query) {
      this.filteredCustomers = [...this.customers]; // Reset list if search is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredCustomers = this.customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(lowerCaseQuery) ||
          customer.id.toLowerCase().includes(lowerCaseQuery)
      );
    }
  }
  // Event triggered when a customer is selected from the list
  onCustomerSelected(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isAddCustomer = false;
  }
  // Method to toggle the form visibility to add a new customer
  showAddCustomerForm(): void {
    this.isAddCustomer = true; // Show the Add Customer form
    this.selectedCustomer = null; // Clear selected customer details
  }


  // Method to handle the new customer data (when added)
  addNewCustomer(customer: Customer) {
    // Logic for adding a new customer (e.g., push to customer list, make an API call)
    console.log('New customer added:', customer);
    this.isAddCustomer = false; // Hide the form after adding the customer
    this.customers.push(customer);  // Add the new customer to the list

  }
  onSearchQueryChange(query: string): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.firstName.toLowerCase().includes(query.toLowerCase()) ||
      customer.id.toLowerCase().includes(query.toLowerCase())
    );
  }
  
 
}