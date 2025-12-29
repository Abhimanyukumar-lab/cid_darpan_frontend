import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveTypeComponent } from './admin-leave-type.component';

describe('AdminLeaveTypeComponent', () => {
  let component: AdminLeaveTypeComponent;
  let fixture: ComponentFixture<AdminLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeaveTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
