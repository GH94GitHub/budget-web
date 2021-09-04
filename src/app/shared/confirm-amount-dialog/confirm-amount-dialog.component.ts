import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-amount-dialog',
  templateUrl: './confirm-amount-dialog.component.html',
  styleUrls: ['./confirm-amount-dialog.component.scss']
})
export class ConfirmAmountDialogComponent implements OnInit {

  amountForm: FormGroup = {} as FormGroup;

  constructor(private dialogRef: MatDialogRef<ConfirmAmountDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.amountForm = this.fb.group({
      amount: [null, Validators.compose([Validators.required])]
    });


  }

  updateAmount() {
    this.dialogRef.close(this.amountForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }



}
