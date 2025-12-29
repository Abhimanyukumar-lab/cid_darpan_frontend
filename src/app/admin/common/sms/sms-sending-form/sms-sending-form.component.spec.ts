import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSendingFormComponent } from './sms-sending-form.component';

describe('SmsSendingFormComponent', () => {
  let component: SmsSendingFormComponent;
  let fixture: ComponentFixture<SmsSendingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsSendingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
