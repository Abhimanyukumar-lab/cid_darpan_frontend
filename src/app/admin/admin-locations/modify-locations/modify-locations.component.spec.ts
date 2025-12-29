import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyLocationsComponent } from './modify-locations.component';

describe('ModifyLocationsComponent', () => {
  let component: ModifyLocationsComponent;
  let fixture: ComponentFixture<ModifyLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
