import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrSummonComponent } from './gr-summon.component';

describe('GrSummonComponent', () => {
  let component: GrSummonComponent;
  let fixture: ComponentFixture<GrSummonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrSummonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrSummonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
