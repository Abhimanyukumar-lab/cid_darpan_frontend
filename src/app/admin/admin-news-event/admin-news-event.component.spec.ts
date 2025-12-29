import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsEventComponent } from './admin-news-event.component';

describe('AdminNewsEventComponent', () => {
  let component: AdminNewsEventComponent;
  let fixture: ComponentFixture<AdminNewsEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
