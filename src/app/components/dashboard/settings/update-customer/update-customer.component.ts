import { Component,Input } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

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
  constructor(
  
    private toast: NgToastService
 

  ) { }

  // Method to handle form submission
  onSubmit() {
    console.log('Updated Customer:', this.customer);
    // alert('Customer updated successfully!');
    this.toast.success("Success", "Customer updated successfully!", 5000);

  }
}