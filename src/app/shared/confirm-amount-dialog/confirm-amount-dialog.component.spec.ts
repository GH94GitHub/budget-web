import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAmountDialogComponent } from './confirm-amount-dialog.component';

describe('ConfirmAmountDialogComponent', () => {
  let component: ConfirmAmountDialogComponent;
  let fixture: ComponentFixture<ConfirmAmountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAmountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAmountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
