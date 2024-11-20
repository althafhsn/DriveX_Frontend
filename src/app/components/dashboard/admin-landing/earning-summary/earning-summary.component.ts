import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-earning-summary',
  templateUrl: './earning-summary.component.html',
  styleUrls: ['./earning-summary.component.css']
})
export class EarningSummaryComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    const ctx = document.getElementById('earningChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          {
            label: 'Last 6 months',
            data: [150000, 180000, 160000, 210000, 240000, 260000],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3
          },
          {
            label: 'Same period last year',
            data: [130000, 140000, 120000, 200000, 220000, 250000],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
  }
}
