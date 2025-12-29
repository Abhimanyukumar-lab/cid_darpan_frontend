import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySmsModuleComponent } from './modify-sms-module.component';

describe('ModifySmsModuleComponent', () => {
  let component: ModifySmsModuleComponent;
  let fixture: ComponentFixture<ModifySmsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySmsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySmsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
