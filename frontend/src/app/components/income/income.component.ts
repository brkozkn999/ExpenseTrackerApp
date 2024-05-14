import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income/income.service';
import { StatsService } from '../../services/stats/stats.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
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
    private message: NzMessageService) {

    }

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
      this.getAllIncomes();
      this.getTotalIncome();
      this.incomeForm.reset();
    }, error => {
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }

  getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe((res) => {
      this.incomes = res;
    }, erorr =>{
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }

  getTotalIncome() {
    this.statsService.getStats().subscribe((res) => {
      this.totalIncome = res.income;
    }, error => {
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }

  deleteIncome(incomeId:number) {
    this.incomeService.deleteIncome(incomeId).subscribe((res) => {
      console.log(res);
      this.getAllIncomes();
      this.getTotalIncome();
      this.message.success("Income deleted successfully!", {nzDuration: 5000});
    }, erorr =>{
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }
}
