import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNHRCComponent } from './view-nhrc.component';

describe('ViewNHRCComponent', () => {
  let component: ViewNHRCComponent;
  let fixture: ComponentFixture<ViewNHRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNHRCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNHRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
