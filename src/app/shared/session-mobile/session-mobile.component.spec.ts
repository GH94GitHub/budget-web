import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMobileComponent } from './session-mobile.component';

describe('SessionMobileComponent', () => {
  let component: SessionMobileComponent;
  let fixture: ComponentFixture<SessionMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
