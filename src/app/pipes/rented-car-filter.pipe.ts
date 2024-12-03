import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentedCarFilter'
})
export class RentedCarFilterPipe implements PipeTransform {

  transform(rentedCars: any[], searchQuery: string): any[] {
    if (!searchQuery.trim()) {
      return rentedCars;  // Return the original list if no search query is provided
    }

    // Function to format dates to 'YYYY-MM-DD' format
    function formatDate(date: Date | string): string {
      // If the date is not valid, return an empty string
      if (!(date instanceof Date) && isNaN(new Date(date).getTime())) {
        return '';
      }
      
      const d = new Date(date);
      return d.toISOString().split('T')[0];  // Format the date as 'YYYY-MM-DD'
    }

    const lowercasedQuery = searchQuery.toLowerCase();  // Ensure the query is lowercase
    
    // Filtering rentedCars with proper type handling
    return rentedCars.filter(rented => {
      return (
        rented.carRegNo.toLowerCase().includes(lowercasedQuery) ||
        rented.carModel.toLowerCase().includes(lowercasedQuery) ||
        rented.carBrand.toLowerCase().includes(lowercasedQuery) ||
        rented.customerFullName.toLowerCase().includes(lowercasedQuery) ||
        formatDate(rented.RequestDate).includes(lowercasedQuery) ||
        formatDate(rented.StartDate).includes(lowercasedQuery) ||
        formatDate(rented.EndDate).includes(lowercasedQuery) ||
        rented.Totalprice.toString().toLowerCase().includes(lowercasedQuery) 
         // If requestDate is a Date
      );
    });
    
  }
}
