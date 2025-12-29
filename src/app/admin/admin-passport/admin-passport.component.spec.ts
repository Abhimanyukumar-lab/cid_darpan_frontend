import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPassportComponent } from './admin-passport.component';

describe('AdminPassportComponent', () => {
  let component: AdminPassportComponent;
  let fixture: ComponentFixture<AdminPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPassportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
