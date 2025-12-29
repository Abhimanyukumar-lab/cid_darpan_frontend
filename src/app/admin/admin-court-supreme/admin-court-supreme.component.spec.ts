import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourtSupremeComponent } from './admin-court-supreme.component';

describe('AdminCourtSupremeComponent', () => {
  let component: AdminCourtSupremeComponent;
  let fixture: ComponentFixture<AdminCourtSupremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourtSupremeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourtSupremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
