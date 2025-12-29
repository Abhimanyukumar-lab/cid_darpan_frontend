import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationUserListComponent } from './notification-user-list.component';

describe('NotificationUserListComponent', () => {
  let component: NotificationUserListComponent;
  let fixture: ComponentFixture<NotificationUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
