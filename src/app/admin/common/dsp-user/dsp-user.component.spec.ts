import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DspUserComponent } from './dsp-user.component';

describe('DspUserComponent', () => {
  let component: DspUserComponent;
  let fixture: ComponentFixture<DspUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DspUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DspUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
