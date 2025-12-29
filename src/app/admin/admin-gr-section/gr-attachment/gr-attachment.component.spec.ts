import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrAttachmentComponent } from './gr-attachment.component';

describe('GrAttachmentComponent', () => {
  let component: GrAttachmentComponent;
  let fixture: ComponentFixture<GrAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
