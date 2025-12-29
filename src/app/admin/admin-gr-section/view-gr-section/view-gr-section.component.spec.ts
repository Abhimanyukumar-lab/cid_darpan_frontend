import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGrSectionComponent } from './view-gr-section.component';

describe('ViewGrSectionComponent', () => {
  let component: ViewGrSectionComponent;
  let fixture: ComponentFixture<ViewGrSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGrSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGrSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
