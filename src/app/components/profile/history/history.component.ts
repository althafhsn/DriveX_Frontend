import { Component, Input } from '@angular/core';
import { Booking, RentalHistory } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  @Input() rentalHistory!: RentalHistory[];


  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.bookingService.rentalHistory(userId).subscribe(
        (response: RentalHistory[]) => {
          this.rentalHistory = response;
        },
        (error) => {
          console.error('Error fetching car details', error);
        }
      );
    }
  }

}
