import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEcommDispatchComponent } from './modify-ecomm-dispatch.component';

describe('ModifyEcommDispatchComponent', () => {
  let component: ModifyEcommDispatchComponent;
  let fixture: ComponentFixture<ModifyEcommDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyEcommDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEcommDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
