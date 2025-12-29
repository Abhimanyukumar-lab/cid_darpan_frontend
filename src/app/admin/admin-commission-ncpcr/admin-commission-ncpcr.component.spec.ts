import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionNcpcrComponent } from './admin-commission-ncpcr.component';

describe('AdminCommissionNcpcrComponent', () => {
  let component: AdminCommissionNcpcrComponent;
  let fixture: ComponentFixture<AdminCommissionNcpcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionNcpcrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionNcpcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
