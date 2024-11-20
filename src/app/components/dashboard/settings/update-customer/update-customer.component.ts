import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent {
  // Sample data for editing
  @Input() customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };

  // Method to handle form submission
  onSubmit() {
    console.log('Updated Customer:', this.customer);
    alert('Customer updated successfully!');
  }
}