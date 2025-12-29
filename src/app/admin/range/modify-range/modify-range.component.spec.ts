import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRangeComponent } from './modify-range.component';

describe('ModifyRangeComponent', () => {
  let component: ModifyRangeComponent;
  let fixture: ComponentFixture<ModifyRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
