import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCitizenReportComponent } from './modify-citizen-report.component';

describe('ModifyCitizenReportComponent', () => {
  let component: ModifyCitizenReportComponent;
  let fixture: ComponentFixture<ModifyCitizenReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCitizenReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCitizenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
