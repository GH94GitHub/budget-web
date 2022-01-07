import { Message } from 'primeng/api/message';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IBill } from 'src/app/shared/interfaces/bill-interface';
import { BillService } from 'src/app/shared/services/bill.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  bills: Array<IBill> = [];
  token: string
  msgs: Array<Message> = [];

  constructor(private billService: BillService, private cookieService: CookieService) {
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

}
