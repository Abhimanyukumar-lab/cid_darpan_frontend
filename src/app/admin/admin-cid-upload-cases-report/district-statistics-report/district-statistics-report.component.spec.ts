import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictStatisticsReportComponent } from './district-statistics-report.component';

describe('DistrictStatisticsReportComponent', () => {
  let component: DistrictStatisticsReportComponent;
  let fixture: ComponentFixture<DistrictStatisticsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictStatisticsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictStatisticsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
