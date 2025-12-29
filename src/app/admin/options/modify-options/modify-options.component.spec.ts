import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOptionsComponent } from './modify-options.component';

describe('ModifyOptionsComponent', () => {
  let component: ModifyOptionsComponent;
  let fixture: ComponentFixture<ModifyOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
