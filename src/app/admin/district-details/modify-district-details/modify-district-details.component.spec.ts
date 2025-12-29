import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDistrictDetailsComponent } from './modify-district-details.component';

describe('ModifyDistrictDetailsComponent', () => {
  let component: ModifyDistrictDetailsComponent;
  let fixture: ComponentFixture<ModifyDistrictDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDistrictDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDistrictDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
