import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './pages/budget/budget.component';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SessionComponent } from './shared/session/session.component';
import { TransactionsComponent } from './shared/transactions/transactions.component';
import { DesktopGuard } from './shared/guards/desktop.guard';
import { MobileGuard } from './shared/guards/mobile.guard';
import { SigninMobileComponent } from './pages/signin-mobile/signin-mobile.component';
import { SessionMobileComponent } from './shared/session-mobile/session-mobile.component';
import { SigninMobileFormComponent } from './pages/signin-mobile-form/signin-mobile-form.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { BillsComponent } from './pages/bills/bills.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'bills',
        component: BillsComponent
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
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component: SessionComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
        canActivate: [DesktopGuard]
      },
      {
        path: 'mobile',
        component: SessionMobileComponent,
        canActivate: [MobileGuard],
        children: [
          {
            path: '',
            component: SigninMobileComponent
          },
          {
            path: 'signin',
            component: SigninMobileFormComponent
          }
        ]
      }
    ]
  },
  {
    path: "404",
    redirectTo: "/"
  },
  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
