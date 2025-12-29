import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrimeReportComponent } from './admin-crime-report.component';

describe('AdminCrimeReportComponent', () => {
  let component: AdminCrimeReportComponent;
  let fixture: ComponentFixture<AdminCrimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrimeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
