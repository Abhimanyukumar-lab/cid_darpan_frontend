import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEcommDispatchComponent } from './view-ecomm-dispatch.component';

describe('ViewEcommDispatchComponent', () => {
  let component: ViewEcommDispatchComponent;
  let fixture: ComponentFixture<ViewEcommDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEcommDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEcommDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
