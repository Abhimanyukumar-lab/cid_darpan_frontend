import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNcobcComponent } from './view-ncobc.component';

describe('ViewNcobcComponent', () => {
  let component: ViewNcobcComponent;
  let fixture: ComponentFixture<ViewNcobcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNcobcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNcobcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
