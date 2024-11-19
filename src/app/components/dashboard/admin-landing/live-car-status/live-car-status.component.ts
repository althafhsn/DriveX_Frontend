import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  carStatusList: CarStatus[] = [
    { carNumber: '6485', driver: 'Alex Noman', status: 'Completed', earning: 35.44 },
    { carNumber: '5665', driver: 'Razib Rahman', status: 'Pending', earning: 0.00 },
    { carNumber: '1755', driver: 'Luke Norton', status: 'In Route', earning: 23.50 }
  ];

  constructor() {}

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'text-success';
      case 'Pending':
        return 'text-warning';
      case 'In Route':
        return 'text-info';
      default:
        return '';
    }
  }
}
