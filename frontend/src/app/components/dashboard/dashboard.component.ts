import { Component } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  info:any;

  constructor(private fb: FormBuilder,
    private statsService: StatsService,
    private message: NzMessageService) {

  }

  ngOnInit() {
    this.getTotalInfo();
  }

  getTotalInfo() {
    this.statsService.getStats().subscribe((res) => {
      this.info = res;
      console.log(res);
    })
  }
}
