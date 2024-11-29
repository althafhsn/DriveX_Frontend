import { Component,OnInit,Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DashboardCustomerService } from '../../../../services/dashboard-customer.service';
import { CustomerResponse } from '../../../../models/customer.model';
@Component({
  selector: 'app-customer-detail-with-car',
  templateUrl: './customer-detail-with-car.component.html',
  styleUrl: './customer-detail-with-car.component.css'
})
export class CustomerDetailWithCarComponent {
  @Input() customerResponse!: CustomerResponse; // Correct type for customerResponse
  rentedCars: any[] = []; // To store rented car details
  isEditable = false;
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

  toggleEdit(): void {
    if (this.isEditable) {
      this.saveCustomerDetails(); // Call saveCustomerDetails when in "Save" mode
    }
    this.isEditable = !this.isEditable; // Toggle edit mode
  }

  saveCustomerDetails(): void {
    if (this.customerResponse.customer) {
      this.customerService.updateCustomer(this.customerResponse.customer).subscribe(
        (response) => {
          console.log('Customer details updated successfully', response);
          this.isEditable = false; // Turn off edit mode after saving
          this.getCustomerDetailsWithRentalInfo(this.customerResponse.customer.id); // Reload customer and rental data
        },
        (error) => {
          console.error('Error updating customer details:', error);
        }
      );
    }
  }
}
