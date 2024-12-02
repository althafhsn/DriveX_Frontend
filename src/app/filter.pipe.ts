// // import { Pipe, PipeTransform } from '@angular/core';

// // @Pipe({
// //   name: 'filter'
// // })
// // export class FilterPipe implements PipeTransform {
// //   transform(cards: any[], filterCriteria: any): any[] {
// //     if (!cards || !filterCriteria) {
// //       return cards;
// //     }

// //     return cards.filter(card => {
// //       return (
// //         (!filterCriteria.brand || card.title.includes(filterCriteria.brand)) &&
// //         (!filterCriteria.description || card.description.includes(filterCriteria.description)) &&
// //         (!filterCriteria.seatCount || card.seatCount.toString() === filterCriteria.seatCount) &&
// //         (!filterCriteria.fuel || card.fuel === filterCriteria.fuel) &&
// //         (!filterCriteria.gear || card.Gear === filterCriteria.gear)
// //       );
// //     });
// //   }
// // }

 

// // import { Pipe, PipeTransform } from '@angular/core';

// // @Pipe({
// //   name: 'filter',
// //   pure: false // Makes the pipe impure for automatic updates
// // })
// // export class FilterPipe implements PipeTransform {
// //   transform(cards: any[], filterCriteria: any): any[] {
// //     if (!cards || !filterCriteria) {
// //       return cards;
// //     }

// //     return cards.filter(card => {
// //       const matchesBrand = !filterCriteria.brand || 
// //         card.title.toLowerCase().includes(filterCriteria.brand.toLowerCase());

// //       const matchesDescription = !filterCriteria.description || 
// //         card.description.toLowerCase().includes(filterCriteria.description.toLowerCase());

// //       const matchesSeatCount = !filterCriteria.seatCount || 
// //         card.seatCount === +filterCriteria.seatCount; // Ensure numeric comparison

// //       const matchesFuel = !filterCriteria.fuel || 
// //         card.fuel.toLowerCase() === filterCriteria.fuel.toLowerCase();

// //       const matchesGear = !filterCriteria.gear || 
// //         card.Gear.toLowerCase() === filterCriteria.gear.toLowerCase();

// //       return matchesBrand && matchesDescription && matchesSeatCount && matchesFuel && matchesGear;
// //     });
// //   }
// // }





// import { Pipe, PipeTransform } from '@angular/core';
// import { Car } from './models/car.model';

// @Pipe({
//   name: 'filterCar'
// })
// export class FilterPipe implements PipeTransform {
//   transform(
//     cars: Car[],
//     selectedBrand: string,
//     selectedModel: string,
//     selectedSeatCount: string,
//     selectedFuelType: string,
//     selectedGearType: string
//   ): Car[] {
//     if (!cars) return []; // If no cars, return an empty array.

//     let filteredCars = cars;

//     if (selectedBrand) {
//       filteredCars = filteredCars.filter(car => car.brandName === selectedBrand);
//     }

//     if (selectedModel) {
//       filteredCars = filteredCars.filter(car => car.modelName === selectedModel);
//     }

//     if (selectedSeatCount) {
//       filteredCars = filteredCars.filter(car => car.seatCount.toString() === selectedSeatCount);
//     }

//     if (selectedFuelType) {
//       filteredCars = filteredCars.filter(car => car.fuelType === selectedFuelType);
//     }

//     if (selectedGearType) {
//       filteredCars = filteredCars.filter(car => car.gearType === selectedGearType);
//     }

//     return filteredCars;
//   }









//   // transform(cards: any[], filterCriteria: any): any[] {
//   //   if (!cards || !filterCriteria) {
//   //     return cards;
//   //   }

//   //   return cards.filter(card => {
//   //     const matchesBrand = !filterCriteria.brand || 
//   //       card.title.toLowerCase().includes(filterCriteria.brand.toLowerCase());

//   //     const matchesDescription = !filterCriteria.description || 
//   //       card.description.toLowerCase().includes(filterCriteria.description.toLowerCase());

//   //     const matchesSeatCount = !filterCriteria.seatCount || 
//   //       card.seatCount === +filterCriteria.seatCount; // Ensure numeric comparison

//   //     const matchesFuel = !filterCriteria.fuel || 
//   //       card.fuel.toLowerCase() === filterCriteria.fuel.toLowerCase();

//   //     const matchesGear = !filterCriteria.gear || 
//   //       card.Gear.toLowerCase() === filterCriteria.gear.toLowerCase();

//   //     return matchesBrand && matchesDescription && matchesSeatCount && matchesFuel && matchesGear;
//   //   });
//   // }
// }

import { Pipe, PipeTransform } from '@angular/core';
import { Car } from './models/car.model';
// import { Car } from '../../../models/car.model';

@Pipe({
  name: 'carFilter'
})
export class FilterPipe implements PipeTransform {
  transform(cars: Car[], filters: any): Car[] {
    if (!cars || !filters) {
      return cars;
    }

    return cars.filter(car => {
      const matchesBrand = !filters.brand || car.brandName === filters.brand;
      const matchesModel = !filters.model || car.modelName === filters.model;
      const matchesSeatCount = !filters.seatCount || car.seatCount === filters.seatCount;
      const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType;
      const matchesGearType = !filters.gearType || car.gearType === filters.gearType;

      return matchesBrand && matchesModel && matchesSeatCount && matchesFuelType && matchesGearType;
    });
  }
}
