import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleUserFormComponent } from './circle-user-form.component';

describe('CircleUserFormComponent', () => {
  let component: CircleUserFormComponent;
  let fixture: ComponentFixture<CircleUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
