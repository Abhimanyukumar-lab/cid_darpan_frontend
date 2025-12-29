import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeadPersonComponent } from './view-dead-person.component';

describe('ViewDeadPersonComponent', () => {
  let component: ViewDeadPersonComponent;
  let fixture: ComponentFixture<ViewDeadPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeadPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeadPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
