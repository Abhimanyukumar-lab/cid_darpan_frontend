import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionNHRCComponent } from './admin-commission-nhrc.component';

describe('AdminCommissionNHRCComponent', () => {
  let component: AdminCommissionNHRCComponent;
  let fixture: ComponentFixture<AdminCommissionNHRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionNHRCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionNHRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
