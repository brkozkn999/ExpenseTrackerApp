import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  info: any;
  expenseList: any[] = [];
  incomeList: any[] = [];
  incomeChart: any = {
    data: [
      {
        color: "#85BB65",
        type: 'line',
        dataPoints: [],
      },
    ],
  };

  expenseChart: any = {
    data: [
      {
        color: "#E0080B",
        type: 'line',
        dataPoints: [],
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private statsService: StatsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getTotalInfo();
    this.statsService.getCharts().subscribe((res) => {
      this.expenseList = res.expenseList;
      this.incomeList = res.incomeList;

      const allIncomes = this.incomeList;
      const allExpenses = this.expenseList;

      this.incomeChart.data[0].dataPoints = allIncomes.map(income => ({
        label: income.date,
        y: income.amount
      }));

      this.expenseChart.data[0].dataPoints = allExpenses.map(expense => ({
        label: expense.date,
        y: expense.amount
      }));
    });
  }

  getTotalInfo(): void {
    this.statsService.getStats().subscribe((res) => {
      this.info = res;
      console.log(res);
    });
  }
}