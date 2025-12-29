import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGrSectionComponent } from './modify-gr-section.component';

describe('ModifyGrSectionComponent', () => {
  let component: ModifyGrSectionComponent;
  let fixture: ComponentFixture<ModifyGrSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyGrSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyGrSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
