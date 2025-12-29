import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyResourceComponent } from './modify-resource.component';

describe('ModifyResourceComponent', () => {
  let component: ModifyResourceComponent;
  let fixture: ComponentFixture<ModifyResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
