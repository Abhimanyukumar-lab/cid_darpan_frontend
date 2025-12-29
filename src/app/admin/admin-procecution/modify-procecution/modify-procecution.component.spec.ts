import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProcecutionComponent } from './modify-procecution.component';

describe('ModifyProcecutionComponent', () => {
  let component: ModifyProcecutionComponent;
  let fixture: ComponentFixture<ModifyProcecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyProcecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProcecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
