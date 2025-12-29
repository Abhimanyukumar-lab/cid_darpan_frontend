import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoliceOfficerComponent } from './admin-police-officer.component';

describe('AdminPoliceOfficerComponent', () => {
  let component: AdminPoliceOfficerComponent;
  let fixture: ComponentFixture<AdminPoliceOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPoliceOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPoliceOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
