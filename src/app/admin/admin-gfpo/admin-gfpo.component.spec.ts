import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrievanceFemalePoliceOfficialComponent } from './admin-gfpo.component';

describe('AdminGrievancePoliceOfficialComponent', () => {
  let component: AdminGrievanceFemalePoliceOfficialComponent;
  let fixture: ComponentFixture<AdminGrievanceFemalePoliceOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGrievanceFemalePoliceOfficialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminGrievanceFemalePoliceOfficialComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
