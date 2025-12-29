import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBestOurTeamComponent } from './admin-best-our-team.component';

describe('AdminOurTeamComponent', () => {
  let component: AdminBestOurTeamComponent;
  let fixture: ComponentFixture<AdminBestOurTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBestOurTeamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBestOurTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
