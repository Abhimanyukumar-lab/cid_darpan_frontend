import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySmsServiceProviderComponent } from './modify-sms-service-provider.component';

describe('ModifySmsServiceProviderComponent', () => {
  let component: ModifySmsServiceProviderComponent;
  let fixture: ComponentFixture<ModifySmsServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySmsServiceProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySmsServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
