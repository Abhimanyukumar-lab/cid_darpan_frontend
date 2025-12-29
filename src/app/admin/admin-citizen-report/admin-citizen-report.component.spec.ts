import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCitizenReportComponent } from './admin-citizen-report.component';

describe('AdminCitizenReportComponent', () => {
  let component: AdminCitizenReportComponent;
  let fixture: ComponentFixture<AdminCitizenReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCitizenReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCitizenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
