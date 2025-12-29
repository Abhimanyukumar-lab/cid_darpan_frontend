import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoGalleryComponent } from './admin-video-gallery.component';

describe('AdminVideoGalleryComponent', () => {
  let component: AdminVideoGalleryComponent;
  let fixture: ComponentFixture<AdminVideoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVideoGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVideoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
