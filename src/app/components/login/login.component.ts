import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';
import { ResetPasswordService } from '../../services/reset-password.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  public resetPaswordEmail!: string;
  public isValidEmail!: boolean;

  loginForm!: FormGroup;

  public role: string = ''

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService

  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userStore.getRoleFromStore()
      .subscribe({
        next: (value) => {
          const roleInToken = this.auth.getRoleFromToken();
          this.role = value || roleInToken
        },
        error: (err) => {
          console.error("Failed to fetch role from store:", err);
        }
      })
  }



  hideShowPassword(): void {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.auth.login({ username, password })
        .subscribe({
          next: (res) => {
            this.loginForm.reset();
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken)
            const tokenPayload = this.auth.decodeToken();
            this.userStore.setFullName(tokenPayload.unique_name);
            this.userStore.setRoleFromStore(tokenPayload.role);
            this.toast.success("SUCCESS", "Login was Successed", 5000);

            if (this.role === "Admin" || this.role === "Manager") {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['./LandingPage']);
            }

          },
          error: (err) => {
            this.toast.danger("ERROR", "Login was Failed", 5000)

          }
        });
    } else {
      validateForm.validateAllFormFields(this.loginForm);
      alert('Form is invalid');
    }
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    // Check if the email is valid
    if (this.checkValidEmail(this.resetPaswordEmail)) {
      const encodedEmail = encodeURIComponent(this.resetPaswordEmail); // Encode the email
  
      // Log the email for debugging purposes
      console.log('Sending reset link to:', encodedEmail);
  
      // Call the service to send the reset password link
      this.resetService.sendResetPasswordLink(this.resetPaswordEmail).subscribe({
        next: (res) => {
          // Show success message
          this.toast.success(
            "SUCCESS", "Reset Password Mail Sent Successfully", 5000
          );
          
          // Clear the email input field
          this.resetPaswordEmail = '';
  
          // Close the modal or perform any other UI action
          const buttonRef = document.getElementById('closeBtn');
          buttonRef?.click();
        },
        error: (err) => {
          // Handle errors
          if (err.status === 400) {
            this.toast.danger("Error", "Invalid email format!", 5000);
          } else if (err.status === 404) {
            this.toast.danger("Error", "Email not found!", 5000);
          } else {
            this.toast.danger(
              "Error", "Something went wrong. Please try again later.", 5000
            );
          }
        }
      });
    } else {
      // If the email is not valid, show an error
      this.toast.danger("Error", "Please enter a valid email address.", 5000);
    }
  }
  
}
