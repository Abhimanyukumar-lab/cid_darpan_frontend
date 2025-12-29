import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDenialComponent } from './permission-denial.component';

describe('PermissionDenialComponent', () => {
  let component: PermissionDenialComponent;
  let fixture: ComponentFixture<PermissionDenialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionDenialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionDenialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
