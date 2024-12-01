import { Component,Input, OnInit } from '@angular/core';
import { Car, CarCustomerResponse, Customer } from '../../../../models/car.model';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-car-trip-history',
  templateUrl: './car-trip-history.component.html',
  styleUrl: './car-trip-history.component.css'
})
export class CarTripHistoryComponent implements OnInit{
  @Input() carResponse!: CarCustomerResponse; // Add @Input()

  constructor(
    private carService: CarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('carId');
    if (carId) {
      this.carService.getCarDetailsWithCustomer(carId).subscribe(
        (response: CarCustomerResponse) => {
          this.carResponse = response;
        },
        (error) => {
          console.error('Error fetching car details', error);
        }
      );
    }
  }
}