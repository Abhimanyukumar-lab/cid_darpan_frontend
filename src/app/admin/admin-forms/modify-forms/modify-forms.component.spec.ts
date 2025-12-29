import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFormsComponent } from './modify-forms.component';

describe('ModifyFormsComponent', () => {
  let component: ModifyFormsComponent;
  let fixture: ComponentFixture<ModifyFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
