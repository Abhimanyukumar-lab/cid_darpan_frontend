import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrSectionDetailsTableComponent } from './gr-section-details-table.component';

describe('GrSectionDetailsTableComponent', () => {
  let component: GrSectionDetailsTableComponent;
  let fixture: ComponentFixture<GrSectionDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrSectionDetailsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrSectionDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
