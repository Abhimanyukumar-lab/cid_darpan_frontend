import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyLeaveTypeComponent } from './modify-leave-type.component';

describe('ModifyLeaveTypeComponent', () => {
  let component: ModifyLeaveTypeComponent;
  let fixture: ComponentFixture<ModifyLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyLeaveTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
