import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDeadPersonComponent } from './modify-dead-person.component';

describe('ModifyDeadPersonComponent', () => {
  let component: ModifyDeadPersonComponent;
  let fixture: ComponentFixture<ModifyDeadPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDeadPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDeadPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
