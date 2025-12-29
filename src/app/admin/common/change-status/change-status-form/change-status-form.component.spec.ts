import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusFormComponent } from './change-status-form.component';

describe('ChangeStatusFormComponent', () => {
  let component: ChangeStatusFormComponent;
  let fixture: ComponentFixture<ChangeStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
