import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { DashboardCustomerService } from '../../../../services/dashboard-customer.service';
import { Customer } from '../../../../models/customer.model';

@Component({
  selector: 'app-all-customers-list',
  templateUrl: './all-customers-list.component.html',
  styleUrls: ['./all-customers-list.component.css'],
})
export class AllCustomersListComponent implements OnInit {
  @Input() customers: Customer[] = [];
  @Output() addCustomer = new EventEmitter<void>(); // Output property for add action
  @Output() customerSelected = new EventEmitter<Customer>(); // Emit Customer object
  errorMessage: string | null = null;

  constructor(private dashBoardListCustomer: DashboardCustomerService) {}

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

  onAddCustomerClick(): void {
    // Notify parent to display add customer form
  } //  this.addCustomer.emit(Customer);
}
