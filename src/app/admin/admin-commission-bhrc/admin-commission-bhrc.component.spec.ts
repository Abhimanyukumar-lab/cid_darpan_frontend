import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionBhrcComponent } from './admin-commission-bhrc.component';

describe('AdminCommissionBhrcComponent', () => {
  let component: AdminCommissionBhrcComponent;
  let fixture: ComponentFixture<AdminCommissionBhrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionBhrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionBhrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
