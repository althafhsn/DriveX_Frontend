
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-rented-car-list',
  templateUrl: './rented-car-list.component.html',

  styleUrls: ['./rented-car-list.component.css']
})
export class RentedCarListComponent{
  // Define the array of rented cars data
  rentedCars = [
    {
      carRegNo: 'AB123CD',
      carModel: 'Model X',
      carBrand: 'Tesla',
      customerFullName: 'John Doe',
      RequestDate: '2024-11-01',
      StartDate: '2024-11-05',
      EndDate: '2024-11-10',
      Totalprice: '$300'
    },
    {
      carRegNo: 'EF456GH',
      carModel: 'Civic',
      carBrand: 'Honda',
      customerFullName: 'Jane Smith',
      RequestDate: '2024-11-02',
      StartDate: '2024-11-06',
      EndDate: '2024-11-12',
      Totalprice: '$250'
    },
    // Add more data as needed
  ];

  // Variable to hold the search query input
  searchQuery: string = '';
  
  // Filtered rented cars based on search query
  filteredRented = [...this.rentedCars];

  constructor() {}

 

  // Method to filter rented cars based on search query
 
  styleUrl: './rented-car-list.component.css'
})
export class RentedCarListComponent {
  tabs = [
    { id: 'ongoing-rental-history', label: 'ongoing rental history' },
    { id: 'rental-history', label: 'Rental History ' }
   
  ];
  
  activeTab: string = 'profile-settings'; // Default active tab

  changeTab(tabId: string) {
    this.activeTab = tabId;
  }
  
  // Method to check if All Customers List should show
  showAllCustomersList(): boolean {
    return this.activeTab === 'update-customer';
  }

}
