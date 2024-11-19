import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
selectedTab: any;
onTabSelected($event: string) {
throw new Error('Method not implemented.');
}
  // Active Tab
  activeTab: string = 'profile-settings'; // Default to 'profile-settings'

  // Tabs List
  tabs = [
    { id: 'profile-settings', label: 'Profile Settings' },
    { id: 'password-update', label: 'Change Password' },
    { id: 'update-customer', label: 'Update Customer' },
    { id: 'update-car', label: 'Update Car' },
    { id: 'payment-methods', label: 'Payment Methods' },
    
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
