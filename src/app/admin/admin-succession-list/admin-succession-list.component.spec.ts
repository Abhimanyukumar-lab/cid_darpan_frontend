import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuccessionListComponent } from './admin-succession-list.component';

describe('AdminSuccessionListComponent', () => {
  let component: AdminSuccessionListComponent;
  let fixture: ComponentFixture<AdminSuccessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSuccessionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuccessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
