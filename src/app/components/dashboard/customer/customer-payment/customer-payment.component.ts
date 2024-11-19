import { Component, Input, OnChanges, } from '@angular/core';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrl: './customer-payment.component.css'
})
export class CustomerPaymentComponent implements OnChanges {
  @Input() customerId!: string; // Accepts the selected customer's ID
  paymentSummary: any = {
    todayEarnings: 0,
    previousDayEarnings: 0,
    percentageChange: 0,
    totalBalance: 0,
    totalWithdrawn: 0
  };

  ngOnChanges(): void {
    // Simulated API Call: Fetch payment summary for the customer
    if (this.customerId) {
      this.fetchPaymentSummary(this.customerId);
    }
  }

  fetchPaymentSummary(customerId: string): void {
    // Simulate API response with mock data
    this.paymentSummary = {
      todayEarnings: 2000.0,
      previousDayEarnings: 9940.0,
      percentageChange: 2.5, // Positive for earnings increase, negative for decrease
      totalBalance: 20000.0,
      totalWithdrawn: 40000.0
    };
  }
}
