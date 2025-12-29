import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFoundPersonComponent } from './admin-found-person.component';

describe('AdminFoundPersonComponent', () => {
  let component: AdminFoundPersonComponent;
  let fixture: ComponentFixture<AdminFoundPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFoundPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFoundPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
