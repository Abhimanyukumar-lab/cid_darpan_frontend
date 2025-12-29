import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGrievancePoliceOfficialComponent } from './modify-gpo.component';

describe('ModifyGrievancePoliceOfficialComponent', () => {
  let component: ModifyGrievancePoliceOfficialComponent;
  let fixture: ComponentFixture<ModifyGrievancePoliceOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyGrievancePoliceOfficialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyGrievancePoliceOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
