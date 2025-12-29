import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutDspComponent } from './admin-about-dsp.component';

describe('AdminAboutDspComponent', () => {
  let component: AdminAboutDspComponent;
  let fixture: ComponentFixture<AdminAboutDspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAboutDspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutDspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
