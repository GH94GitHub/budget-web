import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-amount-dialog',
  templateUrl: './confirm-amount-dialog.component.html',
  styleUrls: ['./confirm-amount-dialog.component.scss']
})
export class ConfirmAmountDialogComponent implements OnInit {

  amountForm: FormGroup = {} as FormGroup;
  actionMessage: string;

  constructor(private dialogRef: MatDialogRef<ConfirmAmountDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {actionMessage: string})
              {
                this.actionMessage = data.actionMessage;
              }

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
