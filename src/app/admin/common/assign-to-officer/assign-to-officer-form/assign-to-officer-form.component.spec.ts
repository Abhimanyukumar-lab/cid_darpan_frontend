import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToOfficerFormComponent } from './assign-to-officer-form.component';

describe('AssignToOfficerFormComponent', () => {
  let component: AssignToOfficerFormComponent;
  let fixture: ComponentFixture<AssignToOfficerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignToOfficerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToOfficerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
