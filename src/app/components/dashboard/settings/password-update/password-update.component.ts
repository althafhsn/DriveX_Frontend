import { Component } from '@angular/core';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css'
})
export class PasswordUpdateComponent {
  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  onSubmit() {
    if (this.passwordData.newPassword === this.passwordData.confirmPassword) {
      // Perform password update logic here
      console.log('Password updated successfully!', this.passwordData);
    } else {
      alert('New password and confirmation do not match.');
    }
  }
}
