import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyHolidayComponent } from './modify-holiday.component';

describe('ModifyHolidayComponent', () => {
  let component: ModifyHolidayComponent;
  let fixture: ComponentFixture<ModifyHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
