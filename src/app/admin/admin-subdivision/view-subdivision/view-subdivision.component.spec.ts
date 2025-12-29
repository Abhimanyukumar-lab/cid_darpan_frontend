import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubdivisionComponent } from './view-subdivision.component';

describe('ViewSubdivisionComponent', () => {
  let component: ViewSubdivisionComponent;
  let fixture: ComponentFixture<ViewSubdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubdivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
