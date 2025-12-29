import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyVideoGalleryComponent } from './modify-video-gallery.component';

describe('ModifyVideoGalleryComponent', () => {
  let component: ModifyVideoGalleryComponent;
  let fixture: ComponentFixture<ModifyVideoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyVideoGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyVideoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
