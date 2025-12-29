import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsServiceProviderComponent } from './sms-service-provider.component';

describe('SmsServiceProviderComponent', () => {
  let component: SmsServiceProviderComponent;
  let fixture: ComponentFixture<SmsServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsServiceProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
