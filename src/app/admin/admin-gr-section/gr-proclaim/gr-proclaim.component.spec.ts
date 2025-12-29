import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrProclaimComponent } from './gr-proclaim.component';

describe('GrProclaimComponent', () => {
  let component: GrProclaimComponent;
  let fixture: ComponentFixture<GrProclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrProclaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrProclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
