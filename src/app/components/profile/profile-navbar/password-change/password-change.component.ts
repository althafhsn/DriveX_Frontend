import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UpdatePassword } from '../../../../models/customer.model';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent implements OnInit {
  typePassword: string = "password";
  typeConfirmPassword: string = "password";
  isTextPassword: boolean = false;
  isTextConfirmPassword: boolean = false;
  eyeIconPassword: string = "fa-eye-slash";
  eyeIconConfirmPassword: string = "fa-eye-slash";

  updatePasswordForm!: FormGroup
  updatePasswordObj=new UpdatePassword();
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: NgToastService,

  ) { }


  ngOnInit(): void {
  

  }


  onSubmit() {

  }


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
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
    return this.updatePasswordForm.controls;
  }
}
