import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListsComponent } from './notification-lists.component';

describe('NotificationListsComponent', () => {
  let component: NotificationListsComponent;
  let fixture: ComponentFixture<NotificationListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
