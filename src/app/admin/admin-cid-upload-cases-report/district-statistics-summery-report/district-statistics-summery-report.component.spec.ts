import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictStatisticsSummeryReportComponent } from './district-statistics-summery-report.component';

describe('DistrictStatisticsSummeryReportComponent', () => {
  let component: DistrictStatisticsSummeryReportComponent;
  let fixture: ComponentFixture<DistrictStatisticsSummeryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictStatisticsSummeryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictStatisticsSummeryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
