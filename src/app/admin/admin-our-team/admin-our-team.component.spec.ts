import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOurTeamComponent } from './admin-our-team.component';

describe('AdminOurTeamComponent', () => {
  let component: AdminOurTeamComponent;
  let fixture: ComponentFixture<AdminOurTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOurTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOurTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
