import { Component, Input, OnInit, } from '@angular/core';
import { CustomerResponse } from '../../../../models/customer.model';
import { Router,ActivatedRoute} from '@angular/router';
import { DashboardCustomerService } from '../../../../services/dashboard-customer.service';
@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrl: './customer-payment.component.css'
})
export class CustomerPaymentComponent implements OnInit  {
  @Input() customerResponse!: CustomerResponse;
  customerId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private customerService: DashboardCustomerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Get customer ID from route params and fetch the customer details
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id');
      if (this.customerId) {
        this.getCustomerDetailsWithRentalInfo(this.customerId);
      }
    });
  }
  getCustomerDetailsWithRentalInfo(id: string): void {
    // Fetch customer details and rented car information from the API
    this.customerService.getCustomerWithRentalInfo(id).subscribe(
      (response) => {
        this.customerResponse = response; // Direct assignment
       
      },
      (error) => {
        console.error('Error fetching customer and rental info:', error);
      }
    );
  }

}
