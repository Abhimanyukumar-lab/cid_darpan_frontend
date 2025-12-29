import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionUserComponent } from './section-user.component';

describe('SectionUserComponent', () => {
  let component: SectionUserComponent;
  let fixture: ComponentFixture<SectionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
