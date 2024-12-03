import { Component, Input, OnInit } from '@angular/core';
import { Car, CarCustomerResponse } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-revenue-details',
  templateUrl: './car-revenue-details.component.html',
  styleUrl: './car-revenue-details.component.css'
})
export class CarRevenueDetailsComponent implements OnInit{
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