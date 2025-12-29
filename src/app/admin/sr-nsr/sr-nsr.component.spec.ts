import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrNsrComponent } from './sr-nsr.component';

describe('SrNsrComponent', () => {
  let component: SrNsrComponent;
  let fixture: ComponentFixture<SrNsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrNsrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrNsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
