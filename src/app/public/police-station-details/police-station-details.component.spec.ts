import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceStationDetailsComponent } from './police-station-details.component';

describe('PoliceStationDetailsComponent', () => {
  let component: PoliceStationDetailsComponent;
  let fixture: ComponentFixture<PoliceStationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceStationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceStationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
