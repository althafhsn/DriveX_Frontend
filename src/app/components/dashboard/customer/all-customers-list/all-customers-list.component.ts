import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Customer, DashboardCustomerService } from '../../../../services/dashboard-customer.service';



@Component({
  selector: 'app-all-customers-list',
  templateUrl: './all-customers-list.component.html',
  styleUrls: ['./all-customers-list.component.css']
})
export class AllCustomersListComponent implements OnInit {
  customers: Customer[] = [];
  errorMessage: string | null = null;

  constructor(
    
    private dashBoardListCustomer: DashboardCustomerService
  ) { }

  ngOnInit(): void {
    this.fetchAllCustomers();
  }

  fetchAllCustomers(): void {
    this.dashBoardListCustomer.DashboardAllCustomers()
      .subscribe(
        (data: Customer[]) => {
          this.customers = data;

        },
        (error) => {
          console.error('Error fetching customers:', error);
          this.errorMessage = 'Failed to load customer data.';
        }

      )
  }
}