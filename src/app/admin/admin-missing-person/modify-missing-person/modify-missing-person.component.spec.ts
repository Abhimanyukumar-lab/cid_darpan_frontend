import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMissingPersonComponent } from './modify-missing-person.component';

describe('ModifyMissingPersonComponent', () => {
  let component: ModifyMissingPersonComponent;
  let fixture: ComponentFixture<ModifyMissingPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMissingPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMissingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
