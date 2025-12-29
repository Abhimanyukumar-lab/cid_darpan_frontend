import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionNcobcComponent } from './admin-commission-ncobc.component';

describe('AdminCommissionNcobcComponent', () => {
  let component: AdminCommissionNcobcComponent;
  let fixture: ComponentFixture<AdminCommissionNcobcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionNcobcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionNcobcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
