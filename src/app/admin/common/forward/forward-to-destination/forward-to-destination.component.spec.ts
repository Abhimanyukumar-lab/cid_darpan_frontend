import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardToDestinationComponent } from './forward-to-destination.component';

describe('ForwardToDestinationComponent', () => {
  let component: ForwardToDestinationComponent;
  let fixture: ComponentFixture<ForwardToDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardToDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardToDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
