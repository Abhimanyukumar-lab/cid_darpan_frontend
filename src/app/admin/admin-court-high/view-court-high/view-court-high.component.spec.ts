import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourtHighComponent } from './view-court-high.component';

describe('ViewCourtHighComponent', () => {
  let component: ViewCourtHighComponent;
  let fixture: ComponentFixture<ViewCourtHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourtHighComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourtHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
