import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubdivisionComponent } from './admin-subdivision.component';

describe('AdminSubdivisionComponent', () => {
  let component: AdminSubdivisionComponent;
  let fixture: ComponentFixture<AdminSubdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubdivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
