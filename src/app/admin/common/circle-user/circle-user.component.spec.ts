import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleUserComponent } from './circle-user.component';

describe('CircleUserComponent', () => {
  let component: CircleUserComponent;
  let fixture: ComponentFixture<CircleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
