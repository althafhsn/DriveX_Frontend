import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.css'
})
export class SearchCarComponent implements OnInit {
  dateForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.dateForm = this.fb.group(
      {
        pickupDate: [
          '',
          [Validators.required, this.pastDateValidator]
        ],
        returnDate: ['', [Validators.required]]
      },
      { validators: this.dateRangeValidator }
    );
  }

  // Accessor for form controls
  get pickupDate(): AbstractControl | null {
    return this.dateForm.get('pickupDate');
  }

  get returnDate(): AbstractControl | null {
    return this.dateForm.get('returnDate');
  }

  // Submit logic
  onSubmit(): void {
    if (this.dateForm.valid) {
      const { pickupDate, returnDate } = this.dateForm.value;
      localStorage.setItem('pickupDate', pickupDate);
      localStorage.setItem('returnDate', returnDate);
      this.router.navigate(['/landing/explorecar']);

    }
  }

  // Validator: Ensure pickup date is not in the past
  private pastDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate < today ? { pastDate: true } : null;
  }

  // Validator: Ensure return date is after pickup date
  private dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const pickup = new Date(group.get('pickupDate')?.value);
    const returnDate = new Date(group.get('returnDate')?.value);

    return pickup && returnDate && returnDate <= pickup
      ? { invalidReturnDate: true }
      : null;
  }
}