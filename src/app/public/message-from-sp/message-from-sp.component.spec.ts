import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFromSpComponent } from './message-from-sp.component';

describe('MessageFromSpComponent', () => {
  let component: MessageFromSpComponent;
  let fixture: ComponentFixture<MessageFromSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageFromSpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFromSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
