import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmAmountDialogComponent } from './shared/confirm-amount-dialog/confirm-amount-dialog.component';
import { TransactionsComponent } from './shared/transactions/transactions.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { CalculateComponent } from './pages/calculate/calculate.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SessionComponent } from './shared/session/session.component';
import { MobileLayoutComponent } from './shared/mobile-layout/mobile-layout.component';
import { SigninMobileComponent } from './pages/signin-mobile/signin-mobile.component';
import { SessionMobileComponent } from './shared/session-mobile/session-mobile.component';
import { SigninMobileFormComponent } from './pages/signin-mobile-form/signin-mobile-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessagesModule } from 'primeng/messages';
import { BillsComponent } from './pages/bills/bills.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AddBillComponent } from './shared/add-bill/add-bill.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ConfirmDeletionComponent } from './shared/confirm-deletion/confirm-deletion.component';
import { EditBillComponent } from './shared/edit-bill/edit-bill.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmAmountDialogComponent,
    TransactionsComponent,
    BudgetComponent,
    CalculateComponent,
    SigninComponent,
    SessionComponent,
    MobileLayoutComponent,
    SigninMobileComponent,
    SessionMobileComponent,
    SigninMobileFormComponent,
    BaseLayoutComponent,
    BillsComponent,
    AddBillComponent,
    ConfirmDeletionComponent,
    EditBillComponent
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MessagesModule,
    TableModule,
    ToastModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
