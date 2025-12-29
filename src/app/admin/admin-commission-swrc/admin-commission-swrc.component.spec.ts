import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionSwrcComponent } from './admin-commission-swrc.component';

describe('AdminCommissionSwrcComponent', () => {
  let component: AdminCommissionSwrcComponent;
  let fixture: ComponentFixture<AdminCommissionSwrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionSwrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionSwrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
