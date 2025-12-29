import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionUserComponent } from './subdivision-user.component';

describe('SubdivisionUserComponent', () => {
  let component: SubdivisionUserComponent;
  let fixture: ComponentFixture<SubdivisionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdivisionUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
