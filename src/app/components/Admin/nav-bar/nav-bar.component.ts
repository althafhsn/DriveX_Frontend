import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changePassword(): void {
    // Logic to change password (e.g., navigate to change password page)
    console.log('Change Password clicked');
    this.isDropdownOpen = false; // Close dropdown after selection
  }

  signOut(): void {
    // Logic to sign out (e.g., remove user session)
    console.log('Sign Out clicked');
    this.isDropdownOpen = false; // Close dropdown after selection
  }
}
