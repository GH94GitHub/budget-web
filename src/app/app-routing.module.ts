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
import { MobileLayoutComponent } from './shared/mobile-layout/mobile-layout.component';
import { MobileHomeComponent } from './pages/mobile-home/mobile-home.component';
import { MobileGuard } from './shared/guards/mobile.guard';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    canActivate: [DesktopGuard]
  },
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
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "mobile",
    component: MobileLayoutComponent,
    children: [
      {
        path: "home",
        component: MobileHomeComponent
      }
    ],
    canActivate: [MobileGuard]
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
  },
  {
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
