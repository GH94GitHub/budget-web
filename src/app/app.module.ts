import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmAmountDialogComponent } from './shared/confirm-amount-dialog/confirm-amount-dialog.component';
import { TransactionsComponent } from './shared/transactions/transactions.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { CalculateComponent } from './pages/calculate/calculate.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmAmountDialogComponent,
    TransactionsComponent,
    BudgetComponent,
    CalculateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
