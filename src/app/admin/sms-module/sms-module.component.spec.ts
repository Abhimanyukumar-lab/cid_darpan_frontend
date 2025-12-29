import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsModuleComponent } from './sms-module.component';

describe('SmsModuleComponent', () => {
  let component: SmsModuleComponent;
  let fixture: ComponentFixture<SmsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
