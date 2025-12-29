import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCitizenReportComponent } from './view-citizen-report.component';

describe('ViewCitizenReportComponent', () => {
  let component: ViewCitizenReportComponent;
  let fixture: ComponentFixture<ViewCitizenReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCitizenReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCitizenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
