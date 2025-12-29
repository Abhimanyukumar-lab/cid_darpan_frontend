import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionNscstComponent } from './admin-commission-nscst.component';

describe('AdminCommissionNscstComponent', () => {
  let component: AdminCommissionNscstComponent;
  let fixture: ComponentFixture<AdminCommissionNscstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionNscstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionNscstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
