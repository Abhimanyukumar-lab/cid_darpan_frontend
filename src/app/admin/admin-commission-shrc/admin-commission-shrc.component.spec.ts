import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionShrcComponent } from './admin-commission-shrc.component';

describe('AdminCommissionShrcComponent', () => {
  let component: AdminCommissionShrcComponent;
  let fixture: ComponentFixture<AdminCommissionShrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionShrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionShrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
