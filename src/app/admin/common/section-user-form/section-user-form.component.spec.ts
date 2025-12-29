import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUserFormComponent } from './section-user-form.component';

describe('SectionUserFormComponent', () => {
  let component: SectionUserFormComponent;
  let fixture: ComponentFixture<SectionUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
