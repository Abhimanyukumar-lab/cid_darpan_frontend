import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShrcComponent } from './view-shrc.component';

describe('ViewShrcComponent', () => {
  let component: ViewShrcComponent;
  let fixture: ComponentFixture<ViewShrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
