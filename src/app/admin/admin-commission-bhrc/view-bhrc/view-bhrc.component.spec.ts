import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBhrcComponent } from './view-bhrc.component';

describe('ViewBhrcComponent', () => {
  let component: ViewBhrcComponent;
  let fixture: ComponentFixture<ViewBhrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBhrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBhrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
