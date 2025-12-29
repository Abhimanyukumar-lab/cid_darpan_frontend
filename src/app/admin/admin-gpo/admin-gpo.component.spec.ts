import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrievancePoliceOfficialComponent } from './admin-gpo.component';

describe('AdminGrievancePoliceOfficialComponent', () => {
  let component: AdminGrievancePoliceOfficialComponent;
  let fixture: ComponentFixture<AdminGrievancePoliceOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGrievancePoliceOfficialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrievancePoliceOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
