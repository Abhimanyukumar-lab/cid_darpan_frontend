import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNscstComponent } from './view-nscst.component';

describe('ViewNscstComponent', () => {
  let component: ViewNscstComponent;
  let fixture: ComponentFixture<ViewNscstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNscstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNscstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
