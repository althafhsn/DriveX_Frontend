import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardCustomerService } from '../../../../services/dashboard-customer.service';
import { Customer } from '../../../../models/customer.model';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer!: Customer; // Define this as an Input property
  isEditable = false;
  customerId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private customerService: DashboardCustomerService,

    private router: Router
  ) {}

  ngOnInit(): void {
    // Get customer ID from route params and fetch the customer details
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');
      if (this.customerId) {
        this.getCustomerDetails(this.customerId);
      }
    });
  }

  getCustomerDetails(id: string): void {
    // Fetch customer details from the service by ID
    this.customerService.getCustomerById(id).subscribe(
      (response) => {
        this.customer = response;  // Assign the fetched customer data
      },
      (error) => {
        console.error('Error fetching customer details:', error);
       
      }
    );
  }

  toggleEdit(): void {
    if (this.isEditable) {
      this.saveCustomerDetails();  // Call saveCustomerDetails when in "Save" mode
    }
    this.isEditable = !this.isEditable;  // Toggle edit mode (to switch between Edit/Save)
  }

  saveCustomerDetails(): void {
    console.log('Saving customer details...');
    if (this.customer) {
      this.customerService.updateCustomer(this.customer).subscribe(
        (response) => {
          console.log('Customer details updated successfully', response);
          this.isEditable = false;  // Turn off edit mode after saving
          this.getCustomerDetails(this.customer.id);  // Optionally reload customer data
        },
        (error) => {
          console.error('Error updating customer details:', error);
        }
      );}
  
  
  
  
    }}
