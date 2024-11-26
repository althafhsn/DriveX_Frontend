// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe implements PipeTransform {
//   transform(cards: any[], filterCriteria: any): any[] {
//     if (!cards || !filterCriteria) {
//       return cards;
//     }

//     return cards.filter(card => {
//       return (
//         (!filterCriteria.brand || card.title.includes(filterCriteria.brand)) &&
//         (!filterCriteria.description || card.description.includes(filterCriteria.description)) &&
//         (!filterCriteria.seatCount || card.seatCount.toString() === filterCriteria.seatCount) &&
//         (!filterCriteria.fuel || card.fuel === filterCriteria.fuel) &&
//         (!filterCriteria.gear || card.Gear === filterCriteria.gear)
//       );
//     });
//   }
// }

 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // Makes the pipe impure for automatic updates
})
export class FilterPipe implements PipeTransform {
  transform(cards: any[], filterCriteria: any): any[] {
    if (!cards || !filterCriteria) {
      return cards;
    }

    return cards.filter(card => {
      const matchesBrand = !filterCriteria.brand || 
        card.title.toLowerCase().includes(filterCriteria.brand.toLowerCase());

      const matchesDescription = !filterCriteria.description || 
        card.description.toLowerCase().includes(filterCriteria.description.toLowerCase());

      const matchesSeatCount = !filterCriteria.seatCount || 
        card.seatCount === +filterCriteria.seatCount; // Ensure numeric comparison

      const matchesFuel = !filterCriteria.fuel || 
        card.fuel.toLowerCase() === filterCriteria.fuel.toLowerCase();

      const matchesGear = !filterCriteria.gear || 
        card.Gear.toLowerCase() === filterCriteria.gear.toLowerCase();

      return matchesBrand && matchesDescription && matchesSeatCount && matchesFuel && matchesGear;
    });
  }
}
