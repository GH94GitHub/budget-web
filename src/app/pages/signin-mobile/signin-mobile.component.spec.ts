import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninMobileComponent } from './signin-mobile.component';

describe('SigninMobileComponent', () => {
  let component: SigninMobileComponent;
  let fixture: ComponentFixture<SigninMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
