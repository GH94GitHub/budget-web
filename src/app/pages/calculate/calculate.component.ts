import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {

  calculateForm : FormGroup = {} as FormGroup;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.calculateForm = this.fb.group({
      // Form Fields
    })
  }

  calculateBudget() {

  }
}
