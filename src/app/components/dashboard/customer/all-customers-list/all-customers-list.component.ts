import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';


import {DashboardCustomerService } from '../../../../services/dashboard-customer.service';
import { Customer, CustomerResponse} from '../../../../models/customer.model';


@Component({
  selector: 'app-all-customers-list',
  templateUrl: './all-customers-list.component.html',
  styleUrls: ['./all-customers-list.component.css'],
})
export class AllCustomersListComponent implements OnInit {
  @Input() customers: Customer[] = [];
  @Output() addCustomer = new EventEmitter<void>(); // Output property for add action
  @Output() customerSelected = new EventEmitter<CustomerResponse>(); 
  errorMessage: string | null = null;

  selectedCustomer: CustomerResponse | null = null;
  rentedCars: any[] = []; // To store rented car details
  constructor(
    
    private dashBoardListCustomer: DashboardCustomerService
  ) { }


  ngOnInit(): void {
    this.fetchAllCustomers();
  }

  fetchAllCustomers(): void {
    this.dashBoardListCustomer.DashboardAllCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
        this.errorMessage = 'Failed to load customer data.';
      }
    );
  }


  onCustomerClick(customer: Customer): void {
    if (customer && customer.id) {
      this.dashBoardListCustomer.getCustomerWithRentalInfo(customer.id)
        .subscribe(
          (response) => {
            console.log('Customer details with rental info:', response);
           
            this.rentedCars = response.rentedCars || [];
            console.log('Rented Cars:', response.rentedCars); 
     
            this.selectedCustomer = response; // Store the response
            this.customerSelected.emit(response);
            
            
          },
          (error) => {
            console.error('Error fetching customer with rental info:', error);
            this.errorMessage = 'Failed to load customer details.';
          }
        );
    }
  }
// selectCustomer(customer: CustomerResponse): void {
//   this.customerSelected.emit(customer);
// }

onAddCustomerClick(): void {
  this.addCustomer.emit(); // Notify the parent component to display Add Customer form
}
}


