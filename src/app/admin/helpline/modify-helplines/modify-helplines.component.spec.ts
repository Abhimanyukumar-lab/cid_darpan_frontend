import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyHelplinesComponent } from './modify-helplines.component';

describe('ModifyHelplinesComponent', () => {
  let component: ModifyHelplinesComponent;
  let fixture: ComponentFixture<ModifyHelplinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyHelplinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyHelplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
