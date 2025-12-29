import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPeaceCommityComponent } from './modify-peace-commity.component';

describe('ModifyPeaceCommityComponent', () => {
  let component: ModifyPeaceCommityComponent;
  let fixture: ComponentFixture<ModifyPeaceCommityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPeaceCommityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPeaceCommityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
