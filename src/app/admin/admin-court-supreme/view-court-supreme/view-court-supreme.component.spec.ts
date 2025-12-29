import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourtSupremeComponent } from './view-court-supreme.component';

describe('ViewCourtSupremeComponent', () => {
  let component: ViewCourtSupremeComponent;
  let fixture: ComponentFixture<ViewCourtSupremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourtSupremeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourtSupremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
