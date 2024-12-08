import { Component } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {
  carouselItems = [
    {
      title: 'Find Affordable Dream Cars for Rental',
      description: 'Fulfill your automotive fantasies without breaking the bank. Check our affordable car rentals for an opulent yet economical ride.',
      imageUrl: './IMAGE/car.png',
      altText: 'Car Image 1'
    },
    {
      title: 'Find Affordable Dream Cars for Rental',
      description: 'Fulfill your automotive fantasies without breaking the bank. Check our affordable car rentals for an opulent yet economical ride.',
      imageUrl: './IMAGE/car10.png',
      altText: 'Car Image 2'
    },
    {
      title: 'Find Affordable Dream Cars for Rental',
      description: 'Fulfill your automotive fantasies without breaking the bank. Check our affordable car rentals for an opulent yet economical ride.',
      imageUrl: './IMAGE/car4.png',
      altText: 'Car Image 3'
    }
  ];
}
