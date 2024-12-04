import { Component,Output,EventEmitter } from '@angular/core';
import { Customer } from '../../../../models/customer.model';
import { DashboardCustomerService } from '../../../../services/dashboard-customer.service';

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

constructor(private customerService: DashboardCustomerService) {}

// Method to handle form submission
onAddCustomer() {
  this.customerService.addCustomer(this.newCustomer).subscribe({
    next: (response) => {
      alert('Customer added successfully!');
      window.location.reload();
    },
    error: (err) => {
      alert('Failed to add customer!');
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
