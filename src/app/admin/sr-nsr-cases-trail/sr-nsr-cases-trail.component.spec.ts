import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrNsrCasesTrailComponent } from './sr-nsr-cases-trail.component';

describe('SrNsrCasesTrailComponent', () => {
  let component: SrNsrCasesTrailComponent;
  let fixture: ComponentFixture<SrNsrCasesTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrNsrCasesTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrNsrCasesTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
