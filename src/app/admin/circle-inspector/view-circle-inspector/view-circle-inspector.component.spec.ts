import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCircleInspectorComponent } from './view-circle-inspector.component';

describe('ViewCircleInspectorComponent', () => {
  let component: ViewCircleInspectorComponent;
  let fixture: ComponentFixture<ViewCircleInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCircleInspectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCircleInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
