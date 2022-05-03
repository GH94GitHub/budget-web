import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IBill } from '../interfaces/bill-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  form: FormGroup = {} as FormGroup;
  bill: IBill = {} as IBill;
  xDaysInput: FormControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditBillComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IBill
  ) {
    console.log(`data.auto - ${data.auto}`);
    this.form = this.fb.group({
      "name": [data.name, Validators.required],
      "amount": [data.amount, Validators.required],
      "dueDate": [new Date(data.dueDate), Validators.required],
      "repeats": ['', Validators.required],
      "reminder": [data.auto ? 'true' : 'false', Validators.required]
    })
    this.bill = this.data;
  }

  ngOnInit(): void {
    switch(this.data.repeats) {
      case null:
        this.form.controls.repeats.setValue('null');
        break;
      case 'mo':
        this.form.controls.repeats.setValue('mo');
        break;
      default:
        this.form.controls.repeats.setValue('x-days');
        this.xDaysInput.setValue(this.bill.repeats);
        break;
    }
  }

  save(): void {
    const formValue = this.form.value;
    let repeats;

    if (formValue.repeats !== 'null') {
      if (formValue.repeats === 'mo') {
        repeats = 'mo';
      }
      // Number x-days
      else {
        repeats = this.xDaysInput.value;
      }
    }
    else {
      repeats = null;
    }

    this.bill.name = formValue.name
    this.bill.amount = formValue.amount
    this.bill.dueDate = formValue.dueDate
    this.bill.repeats = repeats
    this.bill.auto = formValue.reminder;

    console.log(`After bill assignment`)
    console.log(this.bill);

    this.dialogRef.close(this.bill);
  }
}
