import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense/expense.service';
import { StatsService } from '../../services/stats/stats.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {

  expenseForm!: FormGroup;
  expenseUpdateForm!: FormGroup;
  totalExpense:any;
  expenses:any;
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
    private expenseService: ExpenseService,
    private statsService: StatsService,
    private message: NzMessageService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllExpenses();
    this.getTotalExpense();
    
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    })

    this.expenseUpdateForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  getExpenseById(id:number) {
    this.expenseService.getExpenseById(id).subscribe((res) => {
      this.expenseUpdateForm.patchValue(res);
      console.log(res);
    })
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe((res) => {
      this.expenses = res;
      console.log(this.expenses);
    })
  }

  getTotalExpense() {
    this.statsService.getStats().subscribe((res) => {
      this.totalExpense = res.expense;
    })
  }

  submitPostForm() {
    this.expenseService.postExpense(this.expenseForm.value).subscribe((res) =>{
      this.message.success("Expense posted successfully!", {nzDuration: 5000});
      this.getAllExpenses();
      this.getTotalExpense();
      this.expenseForm.reset();
    }, error => {
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }

  submitPutForm(id:number) {
    this.expenseService.updateExpense(id, this.expenseUpdateForm.value).subscribe((res) =>{
      this.message.success("Expense updated successfully!", {nzDuration: 5000});
      this.getAllExpenses();
      this.getTotalExpense();
      this.expenseUpdateForm.reset();
    }, error => {
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }

  deleteExpense(expenseId:number) {
    this.expenseService.deleteExpense(expenseId).subscribe((res) => {
      console.log(res);
      this.getAllExpenses();
      this.getTotalExpense();
      this.message.success("Expense deleted successfully!", {nzDuration: 5000});
    }, erorr =>{
      this.message.error("Someting was wrong. Try again.", {nzDuration: 5000})
    })
  }
}