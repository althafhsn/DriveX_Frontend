import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.css'
})
export class SearchCarComponent {
  dateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      pickupDate: ['', [Validators.required, this.futureOrTodayValidator]],
      returnDate: ['', [Validators.required]]
    }, { validators: this.returnAfterPickupValidator });
  }

  // Custom validator to check if the date is today or in the future
  futureOrTodayValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of the day
    return selectedDate >= today ? null : { pastDate: true };
  }

  // Validator to ensure returnDate is after pickupDate
  returnAfterPickupValidator(group: FormGroup) {
    const pickupDate = group.get('pickupDate')?.value;
    const returnDate = group.get('returnDate')?.value;

    if (pickupDate && returnDate) {
      return new Date(returnDate) > new Date(pickupDate)
        ? null
        : { invalidReturnDate: true };
    }
    return null;
  }

  // Getters for form controls
  get pickupDate() {
    return this.dateForm.get('pickupDate');
  }

  get returnDate() {
    return this.dateForm.get('returnDate');
  }

  onSubmit() {
    if (this.dateForm.valid) {
      alert('Dates are valid!');
    } else {
      alert('Please correct the errors before submitting.');
    }
  }
}
