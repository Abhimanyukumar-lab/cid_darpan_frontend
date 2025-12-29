import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourtLowerComponent } from './admin-court-lower.component';

describe('AdminCourtLowerComponent', () => {
  let component: AdminCourtLowerComponent;
  let fixture: ComponentFixture<AdminCourtLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourtLowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourtLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
