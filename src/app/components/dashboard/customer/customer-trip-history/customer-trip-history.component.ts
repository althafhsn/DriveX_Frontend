import { Component, Input, OnInit  } from '@angular/core';
import { CustomerResponse } from '../../../../models/customer.model';
import { Router,ActivatedRoute} from '@angular/router';
import { DashboardCustomerService } from '../../../../services/dashboard-customer.service';
@Component({
  selector: 'app-customer-trip-history',
  templateUrl: './customer-trip-history.component.html',
  styleUrl: './customer-trip-history.component.css'
})
export class CustomerTripHistoryComponent implements OnInit {
  @Input() customerResponse!: CustomerResponse; // Correct type for customerResponse
  rentedCars: any[] = []; // To store rented car details
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
        this.rentedCars = response.rentedCars || [];
        console.log('Rented Cars:', this.rentedCars);
      },
      (error) => {
        console.error('Error fetching customer and rental info:', error);
      }
    );
  }
  
}
  
