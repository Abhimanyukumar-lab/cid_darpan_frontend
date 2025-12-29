import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadPersonComponent } from './dead-person.component';

describe('DeadPersonComponent', () => {
  let component: DeadPersonComponent;
  let fixture: ComponentFixture<DeadPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
