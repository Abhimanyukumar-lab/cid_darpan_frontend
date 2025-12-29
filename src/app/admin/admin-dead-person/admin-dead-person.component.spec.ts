import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeadPersonComponent } from './admin-dead-person.component';

describe('AdminDeadPersonComponent', () => {
  let component: AdminDeadPersonComponent;
  let fixture: ComponentFixture<AdminDeadPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeadPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeadPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
