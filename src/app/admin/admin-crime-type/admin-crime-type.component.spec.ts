import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrimeTypeComponent } from './admin-crime-type.component';

describe('AdminCrimeTypeComponent', () => {
  let component: AdminCrimeTypeComponent;
  let fixture: ComponentFixture<AdminCrimeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrimeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrimeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
