import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListModifyComponent } from './notification-list-modify.component';

describe('NotificationListModifyComponent', () => {
  let component: NotificationListModifyComponent;
  let fixture: ComponentFixture<NotificationListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
