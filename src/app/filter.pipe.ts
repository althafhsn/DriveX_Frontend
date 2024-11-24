import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(cards: any[], filterCriteria: any): any[] {
    if (!cards || !filterCriteria) {
      return cards;
    }

    return cards.filter(card => {
      return (
        (!filterCriteria.brand || card.title.includes(filterCriteria.brand)) &&
        (!filterCriteria.description || card.description.includes(filterCriteria.description)) &&
        (!filterCriteria.seatCount || card.seatCount.toString() === filterCriteria.seatCount) &&
        (!filterCriteria.fuel || card.fuel === filterCriteria.fuel) &&
        (!filterCriteria.gear || card.Gear === filterCriteria.gear)
      );
    });
  }
}

 
