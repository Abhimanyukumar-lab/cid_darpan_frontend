import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrWarrentComponent } from './gr-warrent.component';

describe('GrWarrentComponent', () => {
  let component: GrWarrentComponent;
  let fixture: ComponentFixture<GrWarrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrWarrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrWarrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
