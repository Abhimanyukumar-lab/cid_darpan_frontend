import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMissingPersonComponent } from './view-missing-person.component';

describe('ViewMissingPersonComponent', () => {
  let component: ViewMissingPersonComponent;
  let fixture: ComponentFixture<ViewMissingPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMissingPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMissingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
