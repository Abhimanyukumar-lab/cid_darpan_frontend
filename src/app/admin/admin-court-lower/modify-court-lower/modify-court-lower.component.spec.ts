import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCourtLowerComponent } from './modify-court-lower.component';

describe('ModifyCourtLowerComponent', () => {
  let component: ModifyCourtLowerComponent;
  let fixture: ComponentFixture<ModifyCourtLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCourtLowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCourtLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
