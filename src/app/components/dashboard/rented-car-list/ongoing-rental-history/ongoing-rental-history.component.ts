import { Component } from '@angular/core';

@Component({
  selector: 'app-ongoing-rental-history',
  templateUrl: './ongoing-rental-history.component.html',
  styleUrl: './ongoing-rental-history.component.css'
})
export class OngoingRentalHistoryComponent {



  // Sample data structure for rental history (should be an array)
  rented = [
    {
      customerNIC: '123456789V',
      carRegNo: 'ABC123',
      RequestDate: new Date('2024-11-01'),
      StartDate: new Date('2024-11-05'),
      EndDate: new Date('2024-11-10'),
      Totalprice: 200
    },
    {
      customerNIC: '987654321X',
      carRegNo: 'XYZ789',
      RequestDate: new Date('2024-11-02'),
      StartDate: new Date('2024-11-06'),
      EndDate: new Date('2024-11-12'),
      Totalprice: 150
    },
    // Add more rental records as needed
  ];
  query: string = ''; // Query bound to the search input
  filteredRented = [...this.rented]; // Copy of the rented array to be filtered

  // Helper function to format dates into a readable string

  constructor() {}

  ngOnInit(): void {}

  // Optional: You can keep the formatDate method for displaying formatted dates
  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}



