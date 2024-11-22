import { Component,OnInit } from '@angular/core';
import { StatisticsService } from '../../../../services/statistics.service';
@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrl: './statics.component.css'
})
export class StatisticsComponent implements OnInit {
  totalEarnings: string = '$0';
  amountsPaid: string = '$0';
  totalRefunds: string = '$0';

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.statisticsService.getStatistics().subscribe((statistics) => {
      this.totalEarnings = `$${statistics.totalEarnings.toLocaleString()}`;
      this.amountsPaid = `$${statistics.amountsPaid.toLocaleString()}`;
      this.totalRefunds = `$${statistics.totalRefunds.toLocaleString()}`;
    });
  }
}