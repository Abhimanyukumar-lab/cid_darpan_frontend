import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGrievancePoliceOfficialComponent } from './view-gpo.component';

describe('ViewComplaintComponent', () => {
  let component: ViewGrievancePoliceOfficialComponent;
  let fixture: ComponentFixture<ViewGrievancePoliceOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGrievancePoliceOfficialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGrievancePoliceOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
