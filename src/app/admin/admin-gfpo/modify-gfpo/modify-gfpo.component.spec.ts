import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGrievanceFemalePoliceOfficialComponent } from './modify-gfpo.component';

describe('ModifyGrievanceFemalePoliceOfficialComponent', () => {
  let component: ModifyGrievanceFemalePoliceOfficialComponent;
  let fixture: ComponentFixture<ModifyGrievanceFemalePoliceOfficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyGrievanceFemalePoliceOfficialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ModifyGrievanceFemalePoliceOfficialComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
