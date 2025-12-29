import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDesignationComponent } from './modify-designation.component';

describe('ModifyDesignationComponent', () => {
  let component: ModifyDesignationComponent;
  let fixture: ComponentFixture<ModifyDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
