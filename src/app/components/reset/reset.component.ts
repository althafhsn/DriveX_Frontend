import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../../models/reset-password-model';
import validateForm from '../../helpers/validateForm';
import { ResetPasswordService } from '../../services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  typePassword: string = "password";
  typeConfirmPassword: string = "password";
  eyeIconPassword: string = "fa-eye-slash";
  eyeIconConfirmPassword: string = "fa-eye-slash";

  constructor(
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private resetService : ResetPasswordService,
    private toaster : NgToastService,
    private route :Router
  ) { }

  ngOnInit(): void {
    // Initialize form with validators
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required, this.passwordStrengthValidator, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    // Fetch email and token from query params
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailToReset = params['email'];
      let uriToken = params['code']
      this.emailToken = uriToken.replace(/ /g, '+')
      console.log(this.emailToReset, this.emailToken , uriToken);
    });
  }

  // Submit form
  onReset(): void {
    if (this.resetPasswordForm.valid) {
        this.resetPasswordObj.email = this.emailToReset;
        this.resetPasswordObj.newPassword =this.resetPasswordForm.value.password;
        this.resetPasswordObj.confirmPassword =this.resetPasswordForm.value.confirmPassword;
        this.resetPasswordObj.emailToken =this.emailToken;

        this.resetService.resetPassword(this.resetPasswordObj).subscribe({
          next : (res)=>{
            this.toaster.success("SUCCESS", "Password reset Successed", 5000);
            this.route.navigate(['/'])
          },
          error: (err) => {
            this.toaster.danger("ERROR", "Password reset Failed", 5000)

          }

        })
    }else{
      validateForm.validateAllFormFields(this.resetPasswordForm)
    }
  }

  // Validate password match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Validate password strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    const errors: ValidationErrors = {};
    if (!hasUppercase) errors['noUppercase'] = true;
    if (!hasNumber) errors['noNumber'] = true;

    return Object.keys(errors).length ? errors : null;
  }

  // Toggle password visibility
  togglePasswordVisibility(type: 'password' | 'confirmPassword'): void {
    if (type === 'password') {
      this.typePassword = this.typePassword === 'password' ? 'text' : 'password';
      this.eyeIconPassword = this.typePassword === 'text' ? 'fa-eye' : 'fa-eye-slash';
    } else {
      this.typeConfirmPassword = this.typeConfirmPassword === 'password' ? 'text' : 'password';
      this.eyeIconConfirmPassword = this.typeConfirmPassword === 'text' ? 'fa-eye' : 'fa-eye-slash';
    }
  }

  // Get form control for easy access in the template
  get form() {
    return this.resetPasswordForm.controls;
  }
}
