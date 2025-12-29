import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCidUploadCasesReportComponent } from './admin-cid-upload-cases-report.component';

describe('AdminCidUploadCasesReportComponent', () => {
  let component: AdminCidUploadCasesReportComponent;
  let fixture: ComponentFixture<AdminCidUploadCasesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCidUploadCasesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCidUploadCasesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
