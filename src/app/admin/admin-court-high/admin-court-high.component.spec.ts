import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourtHighComponent } from './admin-court-high.component';

describe('AdminCourtHighComponent', () => {
  let component: AdminCourtHighComponent;
  let fixture: ComponentFixture<AdminCourtHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourtHighComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourtHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
