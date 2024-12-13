import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from '../models/booking.model';

@Pipe({
  name: 'booking'
})
export class BookingPipe implements PipeTransform {

  transform(booking: Booking[], searchText: string): any[] {
    if (!booking || !searchText) {
      return booking; // Return all if no filter
      
    }
    searchText = searchText.toLowerCase();

    return booking.filter(bookings =>
      bookings. requestDate?.toLowerCase().includes(searchText) ||
      bookings.startDate?.toLowerCase().includes(searchText) ||
      bookings.endDate?.toLowerCase().includes(searchText) 
    );
  }

}
