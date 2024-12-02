import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentalFilter'
})
export class RentalFilterPipe implements PipeTransform {
  transform(rented: any[], query: string): any[] {
    if (!query) return rented; // If no query, return the original list

    const lowercasedQuery = query.toLowerCase();
    return rented.filter(r => 
      r.customerNIC.toLowerCase().includes(lowercasedQuery) ||
      r.carRegNo.toLowerCase().includes(lowercasedQuery) ||
      this.formatDate(r.RequestDate).toLowerCase().includes(lowercasedQuery) ||
      this.formatDate(r.StartDate).toLowerCase().includes(lowercasedQuery) ||
      this.formatDate(r.EndDate).toLowerCase().includes(lowercasedQuery) ||
      r.Totalprice.toString().toLowerCase().includes(lowercasedQuery)
    );
  }

  formatDate(date: string): string {
    // Use the desired format for dates here, for example:
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}
