import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDistrictComponent } from './modify-district.component';

describe('ModifyDistrictComponent', () => {
  let component: ModifyDistrictComponent;
  let fixture: ComponentFixture<ModifyDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDistrictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
