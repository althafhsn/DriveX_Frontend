import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(customers: any[], searchText: string): any[] {
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
