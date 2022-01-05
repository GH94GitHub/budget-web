import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { IBill } from '../interfaces/bill-interface';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(token: string) : Observable<any> {
    return this.http.get("/api/user/bills", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  updateBills(token: string, updatedBills: Array<IBill>) : Observable<any>  {
    return this.http.put("/api/user/bills", updatedBills, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  filterOldBills(olderBills: Array<IBill>): Array<IBill> {
    let oldBills = olderBills;
    const updatedBills = oldBills.filter( (bill: IBill) => {
      bill.dueDate = new Date(bill.dueDate);
      const today = new Date(new Date().toDateString());
      const day = new Date(bill.dueDate).getDate();
      console.log(`----- Bill ${bill.name} -----`)
      console.log(`bill.dueDate = ${bill.dueDate}`);
      console.log(`today = ${today}`);
      console.log(`Therefore - bill.dueDate < today = ${bill.dueDate < today}`);
      // if bill is outdated
      if (bill.dueDate < today) {
        // Does bill repeat?
        if (bill.repeats) {
          // Bill repeats monthly
          if (bill.repeats === "mo") {
            // (variable) day of the month of the dueDate
            // Schedule it for next month
            if (today.getDate() > day) {
              let nextDate = new Date(today.getFullYear(), today.getMonth() + 1, day )
              bill.dueDate = nextDate;
              return true;
            }
            // Schedule it for this month
            else {
              bill.dueDate = new Date(today.getFullYear(), today.getMonth(), day);
              return true;
            }

          }
          // bill.repeats contains specified days
          else {
            // keep updating bill until it is scheduled in the future
            console.log(`bill.dueDate.getDate() - ${bill.dueDate.getDate()}`)
            console.log(`today.getDate() - ${today.getDate()}`);

            while(bill.dueDate < today) {

              console.log('----- While loop executed -----');
              console.log(`Bill due date ${bill.dueDate} < ${today}`);

              bill.dueDate.setDate(bill.dueDate.getDate() + Number(bill.repeats));
            }
            console.log(`Bill ${bill.name} repeats specified days`)
            return true;
          }
        }
        // Bill does not repeat - remove it
        else {
          console.log(`Bill ${bill.name} does not repeat (removed)`)
          return false;
        }
      }
      // Bill is not out of date - keep it
      else {
        console.log(`Bill ${bill.name} is not outdated (removed)`)
        return true;
      }
    })
    return updatedBills;
  }
}

