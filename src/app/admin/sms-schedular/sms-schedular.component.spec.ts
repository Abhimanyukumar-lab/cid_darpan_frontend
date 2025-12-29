import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSchedularComponent } from './sms-schedular.component';

describe('SmsSchedularComponent', () => {
  let component: SmsSchedularComponent;
  let fixture: ComponentFixture<SmsSchedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSchedularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
