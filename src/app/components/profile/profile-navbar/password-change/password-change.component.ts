import { Component } from '@angular/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent {
  passwordData2 = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  onSubmit() {
    if (this.passwordData2.newPassword === this.passwordData2.confirmPassword) {
      // Perform password update logic here
      console.log('Password updated successfully!', this.passwordData2);
    } else {
      alert('New password and confirmation do not match.');
    }
  }
}
