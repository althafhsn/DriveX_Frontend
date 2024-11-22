import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../../models/customer.model';



@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @Input() customer!: Customer; // Input to receive customer data
  customerId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');
      // TODO: Fetch customer details using this.customerId if not passed via Input
      console.log('Customer ID:', this.customerId);
    });
  }
  isEditable = false;
  saveCustomerDetails() {
    
    console.log('Customer details saved:', this.customer);
  }
  
}
