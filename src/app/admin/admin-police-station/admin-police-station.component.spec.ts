import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPoliceStationComponent } from './admin-police-station.component';

describe('AdminPoliceStationComponent', () => {
  let component: AdminPoliceStationComponent;
  let fixture: ComponentFixture<AdminPoliceStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPoliceStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPoliceStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
