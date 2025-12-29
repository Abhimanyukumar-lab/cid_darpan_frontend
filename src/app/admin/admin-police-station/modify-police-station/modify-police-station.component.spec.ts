import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPoliceStationComponent } from './modify-police-station.component';

describe('ModifyPoliceStationComponent', () => {
  let component: ModifyPoliceStationComponent;
  let fixture: ComponentFixture<ModifyPoliceStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPoliceStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPoliceStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
