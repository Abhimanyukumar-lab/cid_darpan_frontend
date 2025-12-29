import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySubdivisionComponent } from './modify-subdivision.component';

describe('ModifySubdivisionComponent', () => {
  let component: ModifySubdivisionComponent;
  let fixture: ComponentFixture<ModifySubdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySubdivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
