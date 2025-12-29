import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRtiComponent } from './view-rti.component';

describe('ViewRtiComponent', () => {
  let component: ViewRtiComponent;
  let fixture: ComponentFixture<ViewRtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
