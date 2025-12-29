import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMissingPersonComponent } from './admin-missing-person.component';

describe('AdminMissingPersonComponent', () => {
  let component: AdminMissingPersonComponent;
  let fixture: ComponentFixture<AdminMissingPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMissingPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMissingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
