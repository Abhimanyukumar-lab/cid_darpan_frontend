import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDspComponent } from './view-dsp.component';

describe('ViewDspComponent', () => {
  let component: ViewDspComponent;
  let fixture: ComponentFixture<ViewDspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
