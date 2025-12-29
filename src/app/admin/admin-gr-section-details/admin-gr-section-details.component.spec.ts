import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrSectionDetailsComponent } from './admin-gr-section-details.component';

describe('AdminGrSectionDetailsComponent', () => {
  let component: AdminGrSectionDetailsComponent;
  let fixture: ComponentFixture<AdminGrSectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGrSectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGrSectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
