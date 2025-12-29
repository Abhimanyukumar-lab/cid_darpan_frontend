import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPressReleaseComponent } from './admin-press-release.component';

describe('AdminPressReleaseComponent', () => {
  let component: AdminPressReleaseComponent;
  let fixture: ComponentFixture<AdminPressReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPressReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPressReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
