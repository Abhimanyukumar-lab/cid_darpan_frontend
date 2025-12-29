import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCriminalListComponent } from './admin-criminal-list.component';

describe('AdminCriminalListComponent', () => {
  let component: AdminCriminalListComponent;
  let fixture: ComponentFixture<AdminCriminalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCriminalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCriminalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
