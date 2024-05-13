import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { IncomeComponent } from './components/income/income/income.component';

const routes: Routes = [
  {path:"expense", component: ExpenseComponent},
  {path:"income", component: IncomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
