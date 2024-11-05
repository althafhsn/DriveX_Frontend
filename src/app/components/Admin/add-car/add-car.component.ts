import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  car: any = {};
  carImageUrl: string | ArrayBuffer | null | undefined = null;
  brands: string[] = ['Toyota', 'Ford', 'Honda', 'BMW']; // Populate as needed
  models: string[] = ['Model X', 'Model Y', 'Model Z']; // Populate as needed

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.carImageUrl = e.target?.result as string | ArrayBuffer | null;
      reader.readAsDataURL(file);
    }
  }
  
  

  onSubmit(): void {
    console.log('Car added:', this.car);
  }
}
