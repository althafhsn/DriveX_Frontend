import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UpdatePassword } from '../../../../models/customer.model';
import validateForm from '../../../../helpers/validateForm';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  typePassword: string = 'password';
  typeNewPassword: string = 'password'
  typeConfirmPassword: string = 'password';
  eyeIconPassword: string = 'fa-eye-slash';
  eyeIconNewPassword: string = 'fa-eye-slash';
  eyeIconConfirmPassword: string = 'fa-eye-slash';

  updatePasswordForm!: FormGroup;
  updatePasswordObj = new UpdatePassword();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.updatePasswordForm = this.fb.group(
      {
        oldPassword: [null, Validators.required],
        newPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: [null, Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } =
        this.updatePasswordForm.value;

      this.updatePasswordObj = {
        id: this.auth.getIdFromToken(),
        oldPassword,
        newPassword,
        confirmPassword,
      };

      this.auth.changePassword(this.updatePasswordObj).subscribe({
        next: (res) => {
          this.toast.success('SUCCESS', res.message, 5000)
        },
        error: (err) => { 
          this.toast.danger('ERROR', err.message, 5000) 
        }
      });
      this.updatePasswordForm.reset();
    } else {
      validateForm.validateAllFormFields(this.updatePasswordForm);
    }
  }

  // Match new password and confirm password
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
  togglePasswordVisibility(type: 'password' | 'confirmPassword' | 'newPassword'): void {
    if (type === 'password') {
      this.typePassword =
        this.typePassword === 'password' ? 'text' : 'password';
      this.eyeIconPassword =
        this.typePassword === 'text' ? 'fa-eye' : 'fa-eye-slash';
    } else if (type === 'newPassword') {
      this.typeNewPassword =
        this.typeNewPassword === 'password' ? 'text' : 'password';
      this.eyeIconNewPassword =
        this.typeNewPassword === 'text' ? 'fa-eye' : 'fa-eye-slash';
    } else {
      this.typeConfirmPassword =
        this.typeConfirmPassword === 'password' ? 'text' : 'password';
      this.eyeIconConfirmPassword =
        this.typeConfirmPassword === 'text' ? 'fa-eye' : 'fa-eye-slash';
    }
  }

  // Get form controls for easy access in the template
  get form() {
    return this.updatePasswordForm.controls;
  }
}
