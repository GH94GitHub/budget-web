import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BillService } from '../../shared/services/bill.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private billService: BillService) {
      this.token = this.cookieService.get('session_user');
    }

  ngOnInit(): void {
    this.billService.getBills(this.token).subscribe( (res) => {
      let oldBills = res.data;
      let updatedBills = this.billService.filterOldBills(oldBills);
      this.billService.updateBills(this.token, updatedBills).subscribe( (res) => {
        // Successfully updated
        if (res.data) {
          console.log("successfully updated")
        }
        // Error
        else {
          console.log("error updating");
          // TODO: Display error message from res.message
        }
      // updateBills error
      }, (err) => {
        console.log(err);
        // TODO: Display error message from 'err' variable
      })
    // getBills Error
    }, (err) => {
      console.log(err);
      // TODO: Display error message from 'err' variable
    })
  }
}
