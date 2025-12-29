import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourtLowerComponent } from './view-court-lower.component';

describe('ViewCourtLowerComponent', () => {
  let component: ViewCourtLowerComponent;
  let fixture: ComponentFixture<ViewCourtLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourtLowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourtLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
