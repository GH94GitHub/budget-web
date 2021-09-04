import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmAmountDialogComponent } from 'src/app/shared/confirm-amount-dialog/confirm-amount-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  budget: number = 0;
  user: any;

  constructor(private http: HttpClient, private dialog: MatDialog) {

    this.http.get('/users/amount').subscribe(user => {
      console.log('--Inside Home Component--')
      console.log(user);

      this.user = user;
      this.budget = this.user.amount;
    })
  }

  ngOnInit(): void {

  }

  openConfirmAmountDialog(e : any) {
    console.log('--event--')
    console.log(e);

    const dialogRef = this.dialog.open(ConfirmAmountDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {

      // User submitted the form
      if (data) {

        let tempBudget = this.budget;
        console.log('--Temp Budget-- Before change');
        console.log(tempBudget);
        console.log('--data--');
        console.log(data);

        // Add user input to budget
        if (e.srcElement.id === 'addBtn' || e.srcElement.offsetParent.id === 'addBtn') {
          tempBudget += Number(data.amount);
        }
        // Subtract user input from budget
        else if(e.srcElement.id === 'subtractBtn' || e.srcElement.offsetParent.id === 'subtractBtn') {
          tempBudget -= Number(data.amount)
        }

        console.log('--Temp Budget-- After change');
        console.log(tempBudget);

        // Build http body
        let body = {
          amount: tempBudget
        };

        // Send PUT Request
        this.http.put('/users/amount', body).subscribe(user => {
          console.log('--Inside openConfirmDialog "user" --');
          console.log(user);

          this.user = user;
          this.budget = tempBudget;
        })
      }
    })
  }


}
