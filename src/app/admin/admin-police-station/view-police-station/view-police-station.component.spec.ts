import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoliceStationComponent } from './view-police-station.component';

describe('ViewPoliceStationComponent', () => {
  let component: ViewPoliceStationComponent;
  let fixture: ComponentFixture<ViewPoliceStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPoliceStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPoliceStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
