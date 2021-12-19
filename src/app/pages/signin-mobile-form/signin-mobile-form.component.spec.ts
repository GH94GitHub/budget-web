import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninMobileFormComponent } from './signin-mobile-form.component';

describe('SigninMobileFormComponent', () => {
  let component: SigninMobileFormComponent;
  let fixture: ComponentFixture<SigninMobileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninMobileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninMobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
