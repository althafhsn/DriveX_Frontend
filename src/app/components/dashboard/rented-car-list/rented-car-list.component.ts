
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-rented-car-list',
  templateUrl: './rented-car-list.component.html',

  styleUrls: ['./rented-car-list.component.css']
})
export class RentedCarListComponent {
  tabs = [
    { id: 'ongoing-rental-history', label: 'ongoing rental history' },
    { id: 'rental-history', label: 'Rental History ' },
    { id: 'cancelled-history', label: 'Cancelled History ' }

  ];


  activeTab: string = 'ongoing-rental-history'; // Default active tab



  changeTab(tabId: string) {
    this.activeTab = tabId;
  }
  query: string = '';
  searchText: string = '';
  // Method to check if All Customers List should show
  showAllCustomersList(): boolean {
    return this.activeTab === 'rental-history';
  }

}
