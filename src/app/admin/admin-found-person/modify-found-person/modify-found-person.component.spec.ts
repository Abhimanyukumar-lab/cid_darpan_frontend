import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFoundPersonComponent } from './modify-found-person.component';

describe('ModifyFoundPersonComponent', () => {
  let component: ModifyFoundPersonComponent;
  let fixture: ComponentFixture<ModifyFoundPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFoundPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyFoundPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
