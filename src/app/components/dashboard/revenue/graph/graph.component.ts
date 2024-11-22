import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit,OnDestroy{
  private myChart!: Chart;

  constructor() {}

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

    if (!ctx) {
      console.error('Failed to get 2D context from canvas.');
      return;
    }

    // Chart data and configuration
    const chartConfig: ChartConfiguration = {
      type: 'line' as ChartType, // Change to 'bar', 'pie', etc., if needed
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Earnings',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4, // Smooth curve
          },
          {
            label: 'Refunds',
            data: [28, 48, 40, 19, 86, 27],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Initialize the chart
    this.myChart = new Chart(ctx, chartConfig);
  }

  ngOnDestroy(): void {
    // Destroy the chart instance to prevent memory leaks
    if (this.myChart) {
      this.myChart.destroy();
    }
  }
}