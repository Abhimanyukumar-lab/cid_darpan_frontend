import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySystemModuleComponent } from './modify-system-module.component';

describe('ModifySystemModuleComponent', () => {
  let component: ModifySystemModuleComponent;
  let fixture: ComponentFixture<ModifySystemModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySystemModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySystemModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
