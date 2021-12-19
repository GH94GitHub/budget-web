import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './pages/budget/budget.component';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/auth.guard';
import { SessionComponent } from './shared/session/session.component';
import { TransactionsComponent } from './shared/transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
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
    ]
  },
  {
    path: 'session',
    component: SessionComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
