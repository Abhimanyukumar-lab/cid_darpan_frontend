import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtDetailsFormComponent } from './court-details-form.component';

describe('CourtDetailsFormComponent', () => {
  let component: CourtDetailsFormComponent;
  let fixture: ComponentFixture<CourtDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
