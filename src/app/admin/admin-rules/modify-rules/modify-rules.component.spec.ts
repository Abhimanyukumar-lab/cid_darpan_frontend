import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRulesComponent } from './modify-rules.component';

describe('ModifyRulesComponent', () => {
  let component: ModifyRulesComponent;
  let fixture: ComponentFixture<ModifyRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
