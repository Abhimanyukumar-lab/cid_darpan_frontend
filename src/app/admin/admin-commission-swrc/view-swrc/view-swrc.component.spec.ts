import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSwrcComponent } from './view-swrc.component';

describe('ViewSwrcComponent', () => {
  let component: ViewSwrcComponent;
  let fixture: ComponentFixture<ViewSwrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSwrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSwrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
