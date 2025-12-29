import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNcobcComponent } from './modify-ncobc.component';

describe('ModifyNcobcComponent', () => {
  let component: ModifyNcobcComponent;
  let fixture: ComponentFixture<ModifyNcobcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNcobcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNcobcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
