import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrl: './profile-navbar.component.css'
})
export class ProfileNavbarComponent {
  selectedTab: any;
  onTabSelected($event: string) {
  throw new Error('Method not implemented.');
  }
    // Active Tab
    activeTab: string = 'profile-settings'; // Default to 'profile-settings'
  
    // Tabs List
    tabs = [
      { id: 'profile-settings', label: 'Profile Settings'},
      { id: 'password-update', label: 'Change Password' }
     
      
      
    ];
  
    // Method to change tabs
    changeTab(tabId: string) {
      this.activeTab = tabId;
    
    }
    // Method to check if All Customers List should show
    showAllCustomersList(): boolean {
      return this.activeTab === 'update-customer';
    }
    
}
