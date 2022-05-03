import { Message } from 'primeng/api/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IBill } from 'src/app/shared/interfaces/bill-interface';
import { BillService } from 'src/app/shared/services/bill.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBillComponent } from '../../shared/add-bill/add-bill.component';
import { ConfirmDeletionComponent } from '../../shared/confirm-deletion/confirm-deletion.component'
import { Table } from 'primeng/table';
import { EditBillComponent } from 'src/app/shared/edit-bill/edit-bill.component';


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

  /**
   * Opens dialog allowing the user to add a bill to their account
   */
  openAddBillDialog(): void {
    let dialogRef = this.dialog.open(AddBillComponent, {
      minWidth: '350px'
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result) {
        this.billService.createBill(this.token, result).subscribe( (res) => {
          // Successfully created bill
          this.bills.push(res.data);

        },
        // Create bill error
        (err) => {
        // TODO: Add error message
      })
      }
    });
  }

  /**
   * Deletes specified bill if user confirms the dialog
   * @param bill Bill to delete
   */
  deleteBill(bill: IBill): void {
    const id = bill._id || "null";
    let dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      data: {
        'dialogPrompt': `Are you sure you want to delete "${bill.name}"`
      }
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result) {
        this.billService.deleteBill(this.token, id).subscribe( (res) => {
          // TODO: Add toast to notify successful deletion
          let billIndex = this.bills.indexOf(bill);
          this.bills.splice(billIndex, 1)
        },
        (err) => {
          // TODO: Add error message
        })
      }
    })
  }

  /**
   * Edits specified bill if user saves dialog
   * @param bill Bill to delete
   */
  editBill(bill: IBill): void {
    const dialogRef = this.dialog.open(EditBillComponent, {
      data: bill,
      minWidth: '350px'
    });

    dialogRef.afterClosed().subscribe( (res) => {
      console.log(`res after dialog close`);
      console.log(res);
      if (res) {
        this.billService.editBill(this.token, res._id, res).subscribe( (res) => {

          let index = this.bills.indexOf(bill);
          console.log('this.bills before assignment to array')
          console.log(this.bills[index])
          this.bills[index] = res.data;
        },
        (err) => {
        // TODO: Add error message
        })
      }
    })
  }
}
