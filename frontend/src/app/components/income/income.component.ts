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
  incomeUpdateForm!: FormGroup;
  incomes:any;
  totalIncome:any;
  isVisible = false;

  listOfCategory: any = [
    "Education",
    "Groceries",
    "Health",
    "Subscription",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"];

    showModal(id:number): void {
      this.getExpenseById(id);
      this.isVisible = true;
    }
  
    handleOk(): void {
      this.isVisible = false;
    }
  
    handleCancel(): void {
      this.isVisible = false;
    }

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

    this.incomeUpdateForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  getExpenseById(id:number) {
    this.incomeService.getIncomeById(id).subscribe((res) => {
      this.incomeUpdateForm.patchValue(res);
      console.log(res);
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

  submitPostForm() {
    this.incomeService.postIncome(this.incomeForm.value).subscribe((res) =>{
      this.message.success("Income posted successfully!", {nzDuration: 5000});
      this.getAllIncomes();
      this.getTotalIncome();
      this.incomeForm.reset();
    }, error => {
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }

  submitPutForm(id:number) {
    this.incomeService.updateIncome(id, this.incomeUpdateForm.value).subscribe((res) =>{
      this.message.success("Income updated successfully!", {nzDuration: 5000});
      this.getAllIncomes();
      this.getTotalIncome();
      this.incomeUpdateForm.reset();
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
