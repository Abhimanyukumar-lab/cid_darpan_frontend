import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrSectionComponent } from './admin-gr-section.component';

describe('AdminGrSectionComponent', () => {
  let component: AdminGrSectionComponent;
  let fixture: ComponentFixture<AdminGrSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGrSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
