import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { Revenue } from '../../../../models/car.model';
import { CarService } from '../../../../services/car.service';

@Component({
  selector: 'app-today-stats',
  templateUrl: './today-stats.component.html',
  styleUrls: ['./today-stats.component.scss']
})
export class TodayStatsComponent implements OnInit {
  @Input() revenues!:Revenue;
  errorMessage:string | null = null;
  currentDate: Date = new Date();
  currentTime: string = '';

constructor(private carService:CarService){

}

  ngOnInit(): void {
    this.loadRevenue();
    this.initializeChart();
    this.updateTime();
    setInterval(() => this.updateTime(), 60000); // Update time every minute
  }
  updateTime(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes} `; // Adjust to PM if needed
  }

  loadRevenue():void{
     this.carService.getRevenues().subscribe(
      (data) =>{
        this.revenues = data;
      },
      (error) => {
        console.error('Error fetching booking data:', error);
        this.errorMessage = 'Failed to load booking data.';
      }
     )
  }

  initializeChart() {
    const ctx = document.getElementById('hireCancelChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Total Hired', 'Total Canceled', 'Total Pending'],
        datasets: [
          {
            data: [54, 20, 26],
            backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        }
      }
    });
  }
}

