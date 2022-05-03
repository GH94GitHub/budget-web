import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IBill } from '../interfaces/bill-interface';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {

  form: FormGroup = {} as FormGroup;
  bill: IBill = {} as IBill;
  xDaysInput: FormControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBillComponent>
  ) {
    this.form = this.fb.group({
      "name": ["", Validators.required],
      "amount": ["", Validators.required],
      "dueDate": ["", Validators.required],
      "repeats": ["", Validators.required],
      "reminder": [""]
    })
  }

  ngOnInit(): void {
  }

  createBill(): void {
    const formValue = this.form.value;

    this.bill = {
      "name": formValue.name,
      "amount": formValue.amount,
      "dueDate": formValue.dueDate,
      "repeats": formValue.repeats === 'x-days' ? this.xDaysInput.value : formValue.repeats, // TODO: form can be submitted without specifying days in input
      "auto": formValue.reminder
    }

    this.dialogRef.close(this.bill);
  }
}
