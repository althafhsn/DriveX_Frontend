import { Component } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent {
  carTypes = [
    { name: 'Truck', image: 'IMAGE/truck.png' },
    { name: 'Luxury Sedan', image: 'https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/08/luxury-sedan.png' },
    { name: 'Sedan', image: 'https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/08/sedan.png' },
    { name: 'Sports Car', image: 'https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/08/sports-car.png' },
    { name: 'Hatchback', image: 'https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/08/hatchback.png' },
    { name: 'SUV', image: 'https://july.finestwp.com/newwp/carola/wp-content/uploads/2024/08/suv.png' },
  ];

  // Additional features data
  features = [
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Free Pick Up & Drop',
      description: 'Your convenience matters. Complimentary pick-up and drop-off service for your vehicle, ensuring a stress-free experience.',
    },
    {
      icon: 'fa-solid fa-user-group',
      title: 'Dedicated Support',
      description: 'Our team is available 24/7 to support you. Quality customer service is our top priority.',
    },
  ];
}
