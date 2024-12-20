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
            this.toast.success("SUCCESS", "Login has Successed", 5000);
            this.router.navigate(['/'])
            window.history.pushState(null, '', window.location.href);
            window.onpopstate = function () {
            window.history.pushState(null, '', window.location.href);
            }
          },
          error: (err) => {
            this.toast.danger("ERROR", "Login has Failed", 5000)
          }
        });
    } else {
      validateForm.validateAllFormFields(this.loginForm);
      // alert('Form is invalid');
      this.toast.danger("Error", "Form is invalid", 5000);

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
    if (!this.checkValidEmail(this.resetPaswordEmail)) {
      this.toast.danger("Error", "Invalid email format!", 5000);
      return;
    }
  
    // Log the email for debugging
    console.log("Sending reset link to:", this.resetPaswordEmail);
  
    // Prepare the email object
    const emailObj = { email: this.resetPaswordEmail };
  
    // Call the service to send the reset password link
    this.resetService.sendResetPasswordLink(emailObj).subscribe({
      next: () => {
        // Show success message
        this.toast.success("SUCCESS", "Reset Password Mail Sent Successfully", 5000);
  
        // Clear the email input field
        this.resetPaswordEmail = '';
  
        // Close the modal or perform any other UI action
        const buttonRef = document.getElementById('closeBtn');
        buttonRef?.click();
      },
      error: (err) => {
        // Improved error handling
        switch (err.status) {
          case 400:
            this.toast.danger("Error", "Invalid email format!", 5000);
            break;
          case 404:
            this.toast.danger("Error", "Email not found!", 5000);
            break;
          default:
            this.toast.danger(
              "Error", "Something went wrong. Please try again later.", 5000
            );
            console.error("Error:", err); // Log for debugging
        }
      },
    });
  }
  
  
}
