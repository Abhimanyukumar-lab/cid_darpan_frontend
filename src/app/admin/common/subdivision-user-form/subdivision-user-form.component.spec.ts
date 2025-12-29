import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionUserFormComponent } from './subdivision-user-form.component';

describe('SubdivisionUserFormComponent', () => {
  let component: SubdivisionUserFormComponent;
  let fixture: ComponentFixture<SubdivisionUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdivisionUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
