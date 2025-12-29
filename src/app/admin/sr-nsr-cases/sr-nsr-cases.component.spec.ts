import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrNsrCasesComponent } from './sr-nsr-cases.component';

describe('SrNsrCasesComponent', () => {
  let component: SrNsrCasesComponent;
  let fixture: ComponentFixture<SrNsrCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrNsrCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrNsrCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
