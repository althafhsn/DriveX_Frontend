import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car.model';

@Pipe({
  name: 'carsFilter'
})
export class CarsFilterPipe implements PipeTransform {

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
