import { Message } from 'primeng/api/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IBill } from 'src/app/shared/interfaces/bill-interface';
import { BillService } from 'src/app/shared/services/bill.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBillComponent } from 'src/app/shared/add-bill/add-bill.component';
import { Table } from 'primeng/table';
import { table } from 'console';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  bills: Array<IBill> = [];
  token: string
  msgs: Array<Message> = [];
  @ViewChild(Table) pTable!: Table;

  constructor(
    private billService: BillService,
    private cookieService: CookieService,
    private dialog: MatDialog) {
    this.token = this.cookieService.get('session_user');

    this.billService.getBills(this.token).subscribe( (res) => {
      //Successfully retrieved bills
      if (res.data[0]) {
        this.bills = res.data;
      }
      // User has no bills
      else {
        // TODO: Add error message user has no bills
        console.log("User has no bills");
      }
    },
    (err) => {
      // TODO: Add error message
    })
   }

  ngOnInit(): void {

  }

  openAddBillDialog() {
    let dialogRef = this.dialog.open(AddBillComponent, {
      minWidth: '450px'
    });

    dialogRef.afterClosed().subscribe( (result) => {
      this.billService.createBill(this.token, result).subscribe( (res) => {
        // Successfully created bill
        this.bills.push(res.data);

      },
      // Create bill error
      (err) => {
      // TODO: Add error message
    })
    });
  }
}
