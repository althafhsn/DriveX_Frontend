import { Component,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentRentals } from '../../../../models/booking.model';
import { BookingService } from '../../../../services/booking.service';
interface CarStatus {
  carNumber: string;
  driver: string;
  status: string;
  earning: number;
}
@Component({
  selector: 'app-live-car-status',
  templateUrl: './live-car-status.component.html',
  styleUrl: './live-car-status.component.css'
})
export class LiveCarStatusComponent {
@Input() recentRentals!:RecentRentals[];
errorMessage:string | null =null;

  constructor(private bookingService:BookingService) {}

  ngOnInit(): void {
this.loadRecenRentals();
  }

  loadRecenRentals():void{
 this.bookingService.recentRentals().subscribe(
  (data) => {
    this.recentRentals = data;
  },
  (error) =>{
    console.error('Error fetching booking data:', error);
    this.errorMessage = 'Failed to load booking data.';
  }
 );
  }

}
