import { Component } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
  carBrands = [
    { name: 'Audi', image: 'IMAGE/audi.jpg' },
    { name: 'BMW 1', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
    { name: 'Mercedes Benz', image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
    { name: 'Tesla Motors', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
    { name: 'Volkswagen', image: 'https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/08/volkswagen.png' },
    { name: 'Porsche', image: 'https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/08/porsche.png' }
  ];
  storeBrandName(brandName: string): void {
    localStorage.setItem('selectedCarBrand', brandName);
    console.log(`${brandName} has been stored in localStorage.`);
  }
  
}
