import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyShrcComponent } from './modify-shrc.component';

describe('ModifyShrcComponent', () => {
  let component: ModifyShrcComponent;
  let fixture: ComponentFixture<ModifyShrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyShrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyShrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
