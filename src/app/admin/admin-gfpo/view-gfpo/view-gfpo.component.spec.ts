import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGrievanceFemalePoliceOfficialComponent } from './view-gfpo.component';

describe('ViewComplaintComponent', () => {
  let component: ViewGrievanceFemalePoliceOfficialComponent;
  let fixture: ComponentFixture<ViewGrievanceFemalePoliceOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGrievanceFemalePoliceOfficialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ViewGrievanceFemalePoliceOfficialComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
