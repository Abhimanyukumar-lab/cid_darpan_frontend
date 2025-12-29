import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpoComplaintComponent } from './gpo-complaint.component';

describe('GpoComplaintComponent', () => {
  let component: GpoComplaintComponent;
  let fixture: ComponentFixture<GpoComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GpoComplaintComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpoComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
