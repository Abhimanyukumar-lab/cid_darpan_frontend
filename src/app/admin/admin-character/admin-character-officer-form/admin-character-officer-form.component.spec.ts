import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCharacterOfficerFormComponent } from './admin-character-officer-form.component';

describe('AdminCharacterOfficerFormComponent', () => {
  let component: AdminCharacterOfficerFormComponent;
  let fixture: ComponentFixture<AdminCharacterOfficerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCharacterOfficerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCharacterOfficerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
