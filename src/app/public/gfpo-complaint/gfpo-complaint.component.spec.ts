import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfpoComplaintComponent } from './gfpo-complaint.component';

describe('GpoComplaintComponent', () => {
  let component: GfpoComplaintComponent;
  let fixture: ComponentFixture<GfpoComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GfpoComplaintComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GfpoComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
