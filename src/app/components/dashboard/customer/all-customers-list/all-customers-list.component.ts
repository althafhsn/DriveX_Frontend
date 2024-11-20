import { Component, EventEmitter, OnInit, Output,Input} from '@angular/core';
import { Customer } from '../../../../models/customer.model';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-all-customers-list',
  templateUrl: './all-customers-list.component.html',
  styleUrls: ['./all-customers-list.component.css']
})
export class AllCustomersListComponent implements OnInit {
  @Input() 
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
  ];

  @Output() customerSelected = new EventEmitter<Customer>();
  @Output() addCustomer = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  selectCustomer(customer: Customer): void {
    this.customerSelected.emit(customer);
  }

  onAddCustomerClick(): void {
    this.addCustomer.emit(); // Notify the parent to show the Add Customer form
  }
}