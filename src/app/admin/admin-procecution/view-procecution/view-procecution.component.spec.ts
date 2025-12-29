import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcecutionComponent } from './view-procecution.component';

describe('ViewProcecutionComponent', () => {
  let component: ViewProcecutionComponent;
  let fixture: ComponentFixture<ViewProcecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProcecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProcecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
