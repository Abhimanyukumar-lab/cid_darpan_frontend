import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMostWantedComponent } from './admin-most-wanted.component';

describe('AdminMostWantedComponent', () => {
  let component: AdminMostWantedComponent;
  let fixture: ComponentFixture<AdminMostWantedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMostWantedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMostWantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
