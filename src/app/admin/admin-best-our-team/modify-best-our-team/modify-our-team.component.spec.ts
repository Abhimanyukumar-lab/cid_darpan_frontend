import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOurTeamComponent } from './modify-our-team.component';

describe('ModifyOurTeamComponent', () => {
  let component: ModifyOurTeamComponent;
  let fixture: ComponentFixture<ModifyOurTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyOurTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOurTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
