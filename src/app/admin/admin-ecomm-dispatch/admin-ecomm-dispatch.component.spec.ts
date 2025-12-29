import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEcommDispatchComponent } from './admin-ecomm-dispatch.component';

describe('AdminEcommDispatchComponent', () => {
  let component: AdminEcommDispatchComponent;
  let fixture: ComponentFixture<AdminEcommDispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEcommDispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEcommDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
