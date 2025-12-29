import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveApplicationComponent } from './admin-leave-application.component';

describe('AdminLeaveApplicationComponent', () => {
  let component: AdminLeaveApplicationComponent;
  let fixture: ComponentFixture<AdminLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeaveApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
