import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleInspectorComponent } from './circle-inspector.component';

describe('CircleInspectorComponent', () => {
  let component: CircleInspectorComponent;
  let fixture: ComponentFixture<CircleInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleInspectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
