import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customer.model';
import { DashboardCustomerService } from '../../../services/dashboard-customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  addNewCustomer(newCustomer: Customer): void {
    this.customers.push(newCustomer); // Add the new customer to the list
    this.isAddCustomer = false; // Switch back to the default view
  }
isAddCustomer: boolean = false; 
onSearchQueryChange($event: string) {
throw new Error('Method not implemented.');
}
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;

  constructor(private dashboardCustomerService: DashboardCustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.dashboardCustomerService.DashboardAllCustomers().subscribe(
      (data: Customer[]) => (this.customers = data),
      (error) => console.error('Error fetching customers:', error)
    );
  }

  handleCustomerSelection(customer: Customer): void {
    this.isAddCustomer = true;
    this.selectedCustomer = null;
  }
  toggleAddCustomer(): void {
    this.isAddCustomer = true;
    this.selectedCustomer = null; // Clear selected customer to avoid conflicts
  }
}
