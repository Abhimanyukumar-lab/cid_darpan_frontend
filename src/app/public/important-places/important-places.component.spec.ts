import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPlacesComponent } from './important-places.component';

describe('ImportantPlacesComponent', () => {
  let component: ImportantPlacesComponent;
  let fixture: ComponentFixture<ImportantPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
