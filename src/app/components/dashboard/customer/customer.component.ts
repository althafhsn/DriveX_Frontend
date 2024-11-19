import { Component } from '@angular/core';
import { Customer } from '../../../models/customer.model';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  selectedCustomer: Customer | null = null; 

  // Event triggered when a customer is selected from the list
  onCustomerSelected(customer: Customer): void {
    this.selectedCustomer = customer;
  }
}