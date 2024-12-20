import { Component, OnInit } from '@angular/core';
import { Customer,CustomerResponse } from '../../../models/customer.model';
import { DashboardCustomerService } from '../../../services/dashboard-customer.service';
import { CustomerStateService } from '../../../services/customer-state.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  isComponentActive: boolean = false;
  
  addNewCustomer(newCustomer: Customer): void {
    this.customers.push(newCustomer); // Add the new customer to the list
    this.isAddCustomer = false; // Switch back to the default view
  }
isAddCustomer: boolean = false; 
onSearchQueryChange($event: string) {
throw new Error('Method not implemented.');
}
  customers: Customer[] = [];
  selectedCustomer!: CustomerResponse;
  searchText: string = '';
  constructor(private dashboardCustomerService: DashboardCustomerService,
    private customerState:CustomerStateService
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
    this.customerState.setCustomerActiveState(true);
  }

  ngOnDestroy(): void {
    this.customerState.setCustomerActiveState(false);
  }

  fetchCustomers(): void {
    this.dashboardCustomerService.DashboardAllCustomers().subscribe(
      (data: Customer[]) => (this.customers = data),
      (error) => console.error('Error fetching customers:', error)
    );
  }

  handleCustomerSelection(customer: CustomerResponse): void {
    this.selectedCustomer = customer;
    this.isAddCustomer = false; 
  }
  toggleAddCustomer(): void {
    this.isAddCustomer = true;
   
  }
}
