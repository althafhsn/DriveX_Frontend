import { Component,Output,EventEmitter } from '@angular/core';
import { Customer } from '../../../../models/customer.model';
import { DashboardCustomerService } from '../../../../services/dashboard-customer.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {

  @Output() customerAdded = new EventEmitter<Customer>();
 // Customer object bound to the form
 newCustomer: Customer = {
  id:'',
   firstName: '',
   lastName: '',
   image: '',
   nic: '',
   licence: '',
   email: '',
   addresses: [
     { houseNo: '', street1: '', street2: '', city: '', zipCode: 0, country: '' }
   ],
   phoneNumbers: [{ mobile1: '' }],
   notes: '',
   status: '',
   password: '',
   ongoingRevenue:0,
   totalRevenue:0,
 
  
 };

constructor(private customerService: DashboardCustomerService,private toast: NgToastService) {}

// Method to handle form submission
onAddCustomer() {
  this.customerService.addCustomer(this.newCustomer).subscribe({
    next: (response) => {
      // alert('Customer added successfully!');
      this.toast.success("Success", "Customer added successfully!", 5000);

      window.location.reload();
    },
    error: (err) => {
      // alert('Failed to add customer!');
      this.toast.danger("Error", "Failed to add customer!", 5000);
      console.error(err);
    }
  });
}
addAddress() {
  this.newCustomer.addresses.push({ houseNo: '', street1: '', street2: '', city: '', zipCode: 0, country: '' });
}

removeAddress(index: number) {
  this.newCustomer.addresses.splice(index, 1);
}

addPhoneNumber() {
  this.newCustomer.phoneNumbers.push({ mobile1: '' });
}

removePhoneNumber(index: number) {
  this.newCustomer.phoneNumbers.splice(index, 1);
}
}
