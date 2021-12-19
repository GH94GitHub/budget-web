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
    ],
    canActivate: [AuthGuard]
  },
  // ----- Mobile page routing
  // {
  //   path: "mobile",
  //   component: MobileLayoutComponent,
  //   children: [
  //     {
  //       path: "home",
  //       component: MobileHomeComponent
  //     }
  //   ],
  //   canActivate: [MobileGuard]
  // },
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
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
