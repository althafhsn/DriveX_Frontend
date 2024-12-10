import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentalFilter'
})
export class RentalFilterPipe implements PipeTransform {
  transform(rented: any[], query: string): any[] {
    if (!query) return rented; // If no query, return the original list

    const lowercasedQuery = query.toLowerCase();
    return rented.filter(r => 
      r.nic.toLowerCase().includes(lowercasedQuery) ||
      r.regNo.toLowerCase().includes(lowercasedQuery) ||
      this.formatDate(r.requestDate).toLowerCase().includes(lowercasedQuery) ||
      this.formatDate(r.startDate).toLowerCase().includes(lowercasedQuery) ||
      this.formatDate(r.endDate).toLowerCase().includes(lowercasedQuery) ||
      r.totalPrice.toString().toLowerCase().includes(lowercasedQuery)
    );
  }

  formatDate(date: string): string {
    // Use the desired format for dates here, for example:
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}
