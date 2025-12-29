import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCircleInspectorComponent } from './modify-circle-inspector.component';

describe('ModifyCircleInspectorComponent', () => {
  let component: ModifyCircleInspectorComponent;
  let fixture: ComponentFixture<ModifyCircleInspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCircleInspectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCircleInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
