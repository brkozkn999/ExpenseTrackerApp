import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from '../../../services/income/income.service';
import { StatsService } from '../../../services/stats/stats.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  incomeForm!: FormGroup;
  incomes:any;
  totalIncome:any;
  listOfCategory: any = [
    "Education",
    "Groceries",
    "Health",
    "Subscription",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"];

  constructor(private fb: FormBuilder,
    private incomeService: IncomeService,
    private statsService: StatsService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getAllIncomes();
    this.getTotalIncome();
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  submitForm() {
    this.incomeService.postIncome(this.incomeForm.value).subscribe((res) =>{
      this.message.success("Income posted successfully!", {nzDuration: 5000});
    }, error => {
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }

  getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe((res) => {
      this.incomes = res;
      console.log(this.incomes);
    })
  }

  getTotalIncome() {
    this.statsService.getStats().subscribe((res) => {
      this.totalIncome = res.income;
    })
  }
}
