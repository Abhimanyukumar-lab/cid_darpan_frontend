import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProcecutionComponent } from './admin-procecution.component';

describe('AdminProcecutionComponent', () => {
  let component: AdminProcecutionComponent;
  let fixture: ComponentFixture<AdminProcecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProcecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProcecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
