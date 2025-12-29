import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisitorRegisterComponent } from './admin-visitor-register.component';

describe('AdminVisitorRegisterComponent', () => {
  let component: AdminVisitorRegisterComponent;
  let fixture: ComponentFixture<AdminVisitorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVisitorRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVisitorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
