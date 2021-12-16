import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './pages/budget/budget.component';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { TransactionsComponent } from './shared/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'budget',
    component: BudgetComponent
  },
  {
    path: 'calculate',
    component: CalculateComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
