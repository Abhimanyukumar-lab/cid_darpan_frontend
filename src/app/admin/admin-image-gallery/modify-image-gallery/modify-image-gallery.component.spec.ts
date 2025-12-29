import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyImageGalleryComponent } from './modify-image-gallery.component';

describe('ModifyImageGalleryComponent', () => {
  let component: ModifyImageGalleryComponent;
  let fixture: ComponentFixture<ModifyImageGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyImageGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
