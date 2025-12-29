import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRtiComponent } from './admin-rti.component';

describe('AdminRtiComponent', () => {
  let component: AdminRtiComponent;
  let fixture: ComponentFixture<AdminRtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
