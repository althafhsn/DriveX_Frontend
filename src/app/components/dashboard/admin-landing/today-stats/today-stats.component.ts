import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today-stats',
  templateUrl: './today-stats.component.html',
  styleUrls: ['./today-stats.component.scss']
})
export class TodayStatsComponent implements OnInit {
  currentDate: Date = new Date();
  currentTime: string = '';
  ngOnInit(): void {
    this.initializeChart();
    this.updateTime();
    setInterval(() => this.updateTime(), 60000); // Update time every minute
  }
  updateTime(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes} AM`; // Adjust to PM if needed
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

