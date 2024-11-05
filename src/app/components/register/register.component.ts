import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  typePassword: string = "password";
  typeConfirmPassword: string = "password";
  isTextPassword: boolean = false;
  isTextConfirmPassword: boolean = false;
  eyeIconPassword: string = "fa-eye-slash";
  eyeIconConfirmPassword: string = "fa-eye-slash";

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nicOrPassport: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator, Validators.minLength(8)]], // Use the custom validator
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    // Subscribe to value changes for password and confirmPassword
    this.signUpForm.get('password')?.valueChanges.subscribe(() => {
      this.signUpForm.get('password')?.updateValueAndValidity();
    });

    this.signUpForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.signUpForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      // Send the obj to the database
    } else {
      validateForm.validateAllFormFields(this.signUpForm);
      alert('Form is invalid');
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    // Check for at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
    // Check for at least one number
    const hasNumber = /\d/.test(password);

    const isValidLen = password.length >= 8;

    const errors: ValidationErrors = {};
    if (!hasUppercase) {
      errors['noUppercase'] = true;
    }
    if (!hasNumber) {
      errors['noNumber'] = true;
    }if(!isValidLen){
      errors['minLength'] = true;
    }

    return Object.keys(errors).length ? errors : null; // Return errors if any
  }

  hideShowPassword() {
    this.isTextPassword = !this.isTextPassword;
    this.eyeIconPassword = this.isTextPassword ? "fa-eye" : "fa-eye-slash";
    this.typePassword = this.isTextPassword ? "text" : "password";
  }

  hideShowConfirmPassword() {
    this.isTextConfirmPassword = !this.isTextConfirmPassword;
    this.eyeIconConfirmPassword = this.isTextConfirmPassword ? "fa-eye" : "fa-eye-slash";
    this.typeConfirmPassword = this.isTextConfirmPassword ? "text" : "password";
  }
}
