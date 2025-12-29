import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardToDestinationFormComponent } from './forward-to-destination-form.component';

describe('ForwardToDestinationFormComponent', () => {
  let component: ForwardToDestinationFormComponent;
  let fixture: ComponentFixture<ForwardToDestinationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardToDestinationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardToDestinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
