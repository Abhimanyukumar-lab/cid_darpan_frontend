import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DspUserFormComponent } from './dsp-user-form.component';

describe('DspUserFormComponent', () => {
  let component: DspUserFormComponent;
  let fixture: ComponentFixture<DspUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DspUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DspUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
