import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeaceCommityComponent } from './admin-peace-commity.component';

describe('AdminPeaceCommityComponent', () => {
  let component: AdminPeaceCommityComponent;
  let fixture: ComponentFixture<AdminPeaceCommityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeaceCommityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPeaceCommityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
