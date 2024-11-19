import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {
  profileData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  onSubmit() {
    // Perform profile update logic here
    console.log('Profile updated successfully!', this.profileData);
  }
}