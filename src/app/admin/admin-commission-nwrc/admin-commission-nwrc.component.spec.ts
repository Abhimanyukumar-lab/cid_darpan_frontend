import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionNwrcComponent } from './admin-commission-nwrc.component';

describe('AdminCommissionNwrcComponent', () => {
  let component: AdminCommissionNwrcComponent;
  let fixture: ComponentFixture<AdminCommissionNwrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionNwrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionNwrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
