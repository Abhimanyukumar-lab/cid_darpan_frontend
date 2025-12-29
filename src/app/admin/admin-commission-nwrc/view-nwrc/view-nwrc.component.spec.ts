import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNwrcComponent } from './view-nwrc.component';

describe('ViewNwrcComponent', () => {
  let component: ViewNwrcComponent;
  let fixture: ComponentFixture<ViewNwrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNwrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNwrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
