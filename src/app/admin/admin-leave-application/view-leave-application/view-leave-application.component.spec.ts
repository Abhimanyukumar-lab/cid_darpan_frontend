import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveApplicationComponent } from './view-leave-application.component';

describe('ViewLeaveApplicationComponent', () => {
  let component: ViewLeaveApplicationComponent;
  let fixture: ComponentFixture<ViewLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
