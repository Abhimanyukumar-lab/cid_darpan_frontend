import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProclaimComponent } from './proclaim.component';

describe('ProclaimComponent', () => {
  let component: ProclaimComponent;
  let fixture: ComponentFixture<ProclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProclaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
