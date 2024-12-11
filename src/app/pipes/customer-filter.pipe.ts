import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer.model';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(customers: Customer[], searchText: string): any[] {
    if (!customers || !searchText) {
      return customers; // Return all if no filter
    }

    searchText = searchText.toLowerCase();

    return customers.filter(customer =>
      customer.firstName?.toLowerCase().includes(searchText) ||
      customer.lastName?.toLowerCase().includes(searchText) ||
      customer.nic?.toLowerCase().includes(searchText) ||
      customer.email?.toLowerCase().includes(searchText) ||
      customer.licence?.toLowerCase().includes(searchText)
    );
  }

}

import { Car } from '../models/car.model';
@Pipe({
  name: 'carsFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(cars: Car[], searchText: string): any[] {
    if (!cars || !searchText) {
      return cars; // Return all if no filter
    }

    searchText = searchText.toLowerCase();

    return cars.filter(car =>
      car.brandName?.toLowerCase().includes(searchText) ||
      car.modelName?.toLowerCase().includes(searchText) ||
      car.regNo?.toLowerCase().includes(searchText) ||
      car.pricePerDay?.toString().includes(searchText) ||
      car.year?.toString().includes(searchText)
    );
  }

}


