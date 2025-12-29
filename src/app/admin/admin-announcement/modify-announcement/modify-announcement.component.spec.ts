import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAnnouncementComponent } from './modify-announcement.component';

describe('ModifyAnnouncementComponent', () => {
  let component: ModifyAnnouncementComponent;
  let fixture: ComponentFixture<ModifyAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
