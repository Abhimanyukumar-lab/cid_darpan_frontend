import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProcecutionDetailsComponent } from './admin-procecution-details.component';

describe('AdminProcecutionDetailsComponent', () => {
  let component: AdminProcecutionDetailsComponent;
  let fixture: ComponentFixture<AdminProcecutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProcecutionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProcecutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
