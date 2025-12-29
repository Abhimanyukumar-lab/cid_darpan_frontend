import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReplyComplaintComponent } from './modify-reply-complaint.component';

describe('ModifyReplyComplaintComponent', () => {
  let component: ModifyReplyComplaintComponent;
  let fixture: ComponentFixture<ModifyReplyComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyReplyComplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyReplyComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
