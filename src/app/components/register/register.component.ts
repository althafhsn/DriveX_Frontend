import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nicOrPassport: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [2, Validators.required],
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
      const { firstName, lastName, nicOrPassport, email, role, password } = this.signUpForm.value;
      const signUpData = {
        firstName,
        lastName,
        email,
        nic: nicOrPassport,
        role,
        password
      };

      this.auth.signup(signUpData)
        .subscribe({
          next: (res => {

            this.signUpForm.reset({
              firstName: '',
              lastName: '',
              nicOrPassport: '',
              email: '',
              role: 0,
              password: '',
              confirmPassword: ''
            });


            this.router.navigate(['login']);
          }),
          error: (err => {
            alert(err?.error.message)
          })
        })
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
    } if (!isValidLen) {
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
